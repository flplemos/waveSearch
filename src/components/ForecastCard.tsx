import React from 'react';
import { StarRating } from './StarRating';
import { Eye, EyeOff } from 'lucide-react';

interface ForecastCardProps {
  day: string;
  rating: number;
  isVisible: boolean;      
  onToggle: () => void;    
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ day, rating, isVisible, onToggle }) => {
  return (
    <div className="bg-[rgba(203,203,203,0.95)] backdrop-blur-md rounded-[20px] p-6 flex items-center justify-between border border-[rgba(255,255,255,0.2)] shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-3">
        <h3 className="text-[rgba(45,45,45,1)] text-2xl font-semibold">{day}</h3>
        
        {/* A mágica do borrão acontece aqui com a classe 'blur-md' */}
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 filter-none' : 'opacity-40 blur-md select-none'}`}>
           <StarRating rating={rating} size="md" />
        </div>
      </div>
      
      <button
        onClick={onToggle}
        className="w-14 h-14 bg-[rgba(70,70,70,0.95)] rounded-full flex items-center justify-center hover:bg-[rgba(80,80,80,0.95)] transition-colors border border-[rgba(255,255,255,0.1)] cursor-pointer z-10"
        title={isVisible ? "Ocultar previsão" : "Ver previsão"}
      >
        {/* Lógica simples: Se visível mostra olho cortado, se não, mostra olho normal */}
        {isVisible ? (
            <EyeOff className="w-6 h-6 text-[rgba(94,173,237,1)]" strokeWidth={2} />
        ) : (
            <Eye className="w-6 h-6 text-[rgba(94,173,237,1)]" strokeWidth={2} />
        )}
      </button>
    </div>
  );
};