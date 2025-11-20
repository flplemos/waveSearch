import React from 'react';
import { StarRating } from './StarRating';
import { Edit2 } from 'lucide-react';

interface ForecastCardProps {
  day: string;
  rating: number;
  onEdit?: () => void;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ day, rating, onEdit }) => {
  return (
    <div className="bg-[rgba(203,203,203,0.95)] backdrop-blur-md rounded-[20px] p-6 flex items-center justify-between border border-[rgba(255,255,255,0.2)] shadow-lg">
      <div className="flex flex-col gap-3">
        <h3 className="text-[rgba(45,45,45,1)] text-2xl font-semibold">{day}</h3>
        <StarRating rating={rating} size="md" />
      </div>
      <button
        onClick={onEdit}
        aria-label={`Edit forecast for ${day}`}
        className="w-14 h-14 bg-[rgba(70,70,70,0.95)] rounded-full flex items-center justify-center hover:bg-[rgba(80,80,80,0.95)] transition-colors border border-[rgba(255,255,255,0.1)]"
      >
        <Edit2 className="w-5 h-5 text-[rgba(94,173,237,1)]" strokeWidth={2} />
      </button>
    </div>
  );
};
