import React from 'react';
import { MenuButton } from '@/components/MenuButton';
import { LocationSelector } from '@/components/LocationSelector';
import { SearchButton } from '@/components/SearchButton';
import { StarRating } from '@/components/StarRating';
import { WeatherMetric } from '@/components/WeatherMetric';
import { ForecastCard } from '@/components/ForecastCard';
import { ArrowRight } from 'lucide-react';

const LocationDetails = () => {
  return (
    <main className="flex flex-col relative w-full min-h-screen bg-[rgba(45,45,45,1)]">
      <img
        src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80"
        className="absolute h-full w-full object-cover inset-0"
        alt="Ocean background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(45,45,45,0.4)] to-[rgba(45,45,45,0.7)]" />
      
      <div className="absolute top-6 right-6 z-20">
        <MenuButton />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 pb-6 flex flex-col gap-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[rgba(45,45,45,0.75)] backdrop-blur-md rounded-[20px] p-4 sm:p-6 border border-[rgba(255,255,255,0.1)]">
            <LocationSelector selectedLocation="Ponta Negra, Natal" />
          </div>
          
          <div className="bg-[rgba(45,45,45,0.75)] backdrop-blur-md rounded-[20px] p-4 sm:p-6 border border-[rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-4 text-white mb-4">
              <span className="text-xl font-normal">Friday</span>
              <StarRating rating={5} size="md" />
            </div>
            
            <div className="text-white mb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-2">
                Good conditions,<br />
                big sets with<br />
                onshore wind.
              </h1>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">Waves are pumping!</p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <WeatherMetric type="wave" value="9-10 ft" />
              <WeatherMetric type="wind" value="S 4kt" />
              <WeatherMetric type="temperature" value="25°" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full mt-auto">
        <div className="bg-[rgba(203,203,203,0.97)] backdrop-blur-lg rounded-t-[30px] p-4 sm:p-6 lg:p-8 border-t border-[rgba(255,255,255,0.3)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <ArrowRight className="w-7 h-7 text-[rgba(94,173,237,1)]" strokeWidth={2.5} />
              <h2 className="text-[rgba(45,45,45,1)] text-2xl font-semibold">Next few days</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ForecastCard 
                day="Saturday" 
                rating={4}
                onEdit={() => console.log('Edit Saturday')}
              />
              <ForecastCard 
                day="Monday" 
                rating={3}
                onEdit={() => console.log('Edit Monday')}
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
