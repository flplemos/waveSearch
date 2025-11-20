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
import { ArrowRight, Waves } from 'lucide-react';
import { LOCATIONS, LocationKey } from '@/lib/locations';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const LocationDetails = () => {
  const { id } = useParams();
  const locationSlug = (id as LocationKey) || 'ponta-negra';
  const locationData = LOCATIONS[locationSlug] || LOCATIONS['ponta-negra'];

  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});

  const toggleCardVisibility = (day: string) => {
    setVisibleCards(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const fetchWeatherData = async () => {
    const { lat, lng } = locationData;
    
    // 1. Buscamos dados do CLIMA
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m&hourly=temperature_2m`
    );
    const weather = await weatherRes.json();

    // 2. Buscamos dados do MAR (Ondas + MARÉ REAL)
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

  // --- PREPARANDO DADOS DA MARÉ ---
  const tideData = data?.marine?.hourly?.time
    ? data.marine.hourly.time
        .slice(0, 24)
        .map((timeStr: string, index: number) => ({
          time: timeStr.split('T')[1], 
          height: data.marine.hourly.sea_level_height_msl ? data.marine.hourly.sea_level_height_msl[index] : 0
        }))
    : [];

  // Dados atuais
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

  // TRADUÇÃO DAS MENSAGENS
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
                {/* MENSAGEM PRINCIPAL TRADUZIDA */}
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