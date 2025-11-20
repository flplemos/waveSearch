import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < rating ? 'fill-white text-white' : 'fill-transparent text-white'
          }`}
          strokeWidth={2}
        />
      ))}
    </div>
  );
};
