import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MenuButton } from '@/components/MenuButton';
import { LocationSelector } from '@/components/LocationSelector';
import { SearchButton } from '@/components/SearchButton';
import { StarRating } from '@/components/StarRating';
import { WeatherMetric } from '@/components/WeatherMetric';
import { ForecastCard } from '@/components/ForecastCard';
import { TideChart } from '@/components/TideChart';
import { ArrowRight, Waves, Star, MessageSquarePlus, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LOCATIONS, LocationKey } from '@/lib/locations';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReviewForm } from '@/components/ReviewForm';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const LocationDetails = () => {
  const { id } = useParams();
  const locationSlug = (id as LocationKey) || 'ponta-negra';
  const locationData = LOCATIONS[locationSlug] || LOCATIONS['ponta-negra'];

  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  // 1. Estado para controlar se o modal está aberto ou fechado
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleCardVisibility = (day: string) => {
    setVisibleCards(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const fetchWeatherData = async () => {
    const { lat, lng } = locationData;
    
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m&hourly=temperature_2m`
    );
    const weather = await weatherRes.json();

    const marineRes = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=wave_height,wave_direction&hourly=wave_height,sea_level_height_msl&timezone=auto`
    );
    const marine = await marineRes.json();

    return { weather, marine };
  };

  const { data, isLoading } = useQuery({
    queryKey: ['weather', locationSlug],
    queryFn: fetchWeatherData
  });

  // Query para buscar as avaliações
  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', locationSlug],
    queryFn: async () => {
      // 2. Criar data de "Hoje à 00:00" para filtrar
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('location', locationSlug)
        .gte('created_at', todayISO) // 3. Filtro: Apenas criados DEPOIS da meia-noite de hoje
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    }
  });

  const tideData = data?.marine?.hourly?.time
    ? data.marine.hourly.time
        .slice(0, 24)
        .map((timeStr: string, index: number) => ({
          time: timeStr.split('T')[1], 
          height: data.marine.hourly.sea_level_height_msl ? data.marine.hourly.sea_level_height_msl[index] : 0
        }))
    : [];

  const currentTemp = data?.weather?.current?.temperature_2m 
    ? `${Math.round(data.weather.current.temperature_2m)}°C` 
    : '--';
  const currentWind = data?.weather?.current?.wind_speed_10m 
    ? `${Math.round(data.weather.current.wind_speed_10m)} km/h` 
    : '--';
  const currentWave = data?.marine?.current?.wave_height 
    ? `${data.marine.current.wave_height} m` 
    : '--';
  const waveHeight = data?.marine?.current?.wave_height || 0;
  const starRating = waveHeight > 2 ? 5 : waveHeight > 1.5 ? 4 : waveHeight > 1 ? 3 : 2;

  const getConditionTitle = () => {
    if (isLoading) return "Carregando...";
    if (waveHeight > 2) return "Condições Épicas,\nséries grandes entrando.";
    if (waveHeight > 1) return "Boas condições,\nondas divertidas hoje.";
    return "Marolas pequenas,\nbom para iniciantes.";
  };

  return (
    <main className="flex flex-col relative w-full min-h-screen bg-[rgba(45,45,45,1)]">
      <img
        src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80"
        className="absolute h-full w-full object-cover inset-0"
        alt="Ocean background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(45,45,45,0.4)] to-[rgba(45,45,45,0.7)]" />
      
      <div className="hidden md:block absolute top-6 right-6 z-50">
        <MenuButton />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-4 md:pt-20 pb-6 flex flex-col gap-6 max-w-7xl mx-auto">
        
        <div className="flex justify-end items-center md:hidden w-full h-16">
            <MenuButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BOX DA ESQUERDA */}
          <div className="bg-[rgba(45,45,45,0.75)] backdrop-blur-md rounded-[20px] p-4 sm:p-6 border border-[rgba(255,255,255,0.1)] flex flex-col justify-between gap-4">
            <LocationSelector selectedLocation={locationSlug} />
            
            <div className="lg:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 h-12 text-base font-normal rounded-[15px]"
                  >
                    <Waves className="mr-2 h-5 w-5 text-[rgba(94,173,237,1)]" />
                    Ver Tábua de Marés (Real)
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-[#2a2a2a] border-t border-white/10">
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle className="text-white text-center">Marés para Hoje</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-8 h-[300px]">
                       <TideChart data={tideData} />
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            <div className="hidden lg:block mt-auto pt-4 border-t border-white/10">
                 <TideChart data={tideData} />
            </div>
          </div>
          
          {/* BOX DA DIREITA */}
          <div className="bg-[rgba(45,45,45,0.75)] backdrop-blur-md rounded-[20px] p-4 sm:p-6 border border-[rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-4 text-white mb-4">
              <span className="text-xl font-normal">Hoje</span>
              <StarRating rating={starRating} size="md" />
            </div>
            
            <div className="text-white mb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-2 whitespace-pre-line">
                {getConditionTitle()}
              </h1>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                {starRating >= 4 ? "O mar está bombando!" : "Bora pro surf!"}
              </p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <WeatherMetric type="wave" value={currentWave} />
              <WeatherMetric type="wind" value={currentWind} />
              <WeatherMetric type="temperature" value={currentTemp} />
            </div>
          </div>
        </div>

        {/* SEÇÃO DE AVALIAÇÕES */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl sm:text-2xl font-semibold">Relatos de Hoje</h2>
            
            {/* 4. Controlamos o Dialog com 'open' e 'onOpenChange' */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#5EADED] hover:bg-[#4c9bd6] text-white gap-2">
                  <MessageSquarePlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Avaliar pico</span>
                  <span className="sm:hidden">Avaliar</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-white/10 text-white max-w-md w-[90%] rounded-xl">
                <DialogHeader>
                  <DialogTitle>Como está o mar hoje?</DialogTitle>
                </DialogHeader>
                
                {/* 5. Passamos a função para fechar o modal no sucesso */}
                <ReviewForm 
                  locationSlug={locationSlug} 
                  onSuccess={() => {
                    refetchReviews();
                    setIsDialogOpen(false); // Fecha o modal
                  }} 
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews?.length === 0 ? (
              <div className="col-span-full bg-[rgba(45,45,45,0.6)] backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
                <p className="text-gray-400">Nenhum relato hoje. O que acha de ser o primeiro?</p>
              </div>
            ) : (
              reviews?.map((review: any) => (
                <div key={review.id} className="bg-[rgba(45,45,45,0.8)] backdrop-blur-sm border border-white/10 rounded-xl p-4 transition hover:bg-[rgba(45,45,45,0.9)]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm text-gray-300 font-medium truncate">
                          {review.user_name || "Surfista Local"}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                          {review.created_at && formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: ptBR })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed break-words">
                      "{review.comment}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
      
      <div className="relative z-10 w-full mt-auto">
        <div className="bg-[rgba(203,203,203,0.97)] backdrop-blur-lg rounded-t-[30px] p-4 sm:p-6 lg:p-8 border-t border-[rgba(255,255,255,0.3)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <ArrowRight className="w-7 h-7 text-[rgba(94,173,237,1)]" strokeWidth={2.5} />
              <h2 className="text-[rgba(45,45,45,1)] text-2xl font-semibold">Previsão</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ForecastCard 
                day="Amanhã" 
                rating={starRating > 1 ? starRating - 1 : 1}
                isVisible={!!visibleCards["Amanhã"]}
                onToggle={() => toggleCardVisibility("Amanhã")}
              />
              <ForecastCard 
                day="Depois de amanhã" 
                rating={starRating}
                isVisible={!!visibleCards["Depois de amanhã"]}
                onToggle={() => toggleCardVisibility("Depois de amanhã")}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-[rgba(45,45,45,1)] py-6 flex justify-center px-4">
          <SearchButton />
        </div>
      </div>
    </main>
  );
};

export default LocationDetails;