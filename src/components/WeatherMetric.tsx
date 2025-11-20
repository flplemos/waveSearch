import React from 'react';
import { Waves, Wind, Cloud } from 'lucide-react';

interface WeatherMetricProps {
  type: 'wave' | 'wind' | 'temperature';
  value: string;
}

export const WeatherMetric: React.FC<WeatherMetricProps> = ({ type, value }) => {
  const getIcon = () => {
    switch (type) {
      case 'wave':
        return <Waves className="w-6 h-6 text-[rgba(94,173,237,1)]" strokeWidth={2} />;
      case 'wind':
        return <Wind className="w-6 h-6 text-[rgba(94,173,237,1)]" strokeWidth={2} />;
      case 'temperature':
        return <Cloud className="w-6 h-6 text-[rgba(94,173,237,1)]" strokeWidth={2} />;
    }
  };

  return (
    <div className="flex items-center gap-2 bg-[rgba(70,70,70,0.9)] backdrop-blur-sm px-5 py-3 rounded-[20px] border border-[rgba(255,255,255,0.1)]">
      {getIcon()}
      <span className="text-white text-lg font-normal">{value}</span>
    </div>
  );
};
