import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LocationSelectorProps {
  selectedLocation?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedLocation }) => {
  if (selectedLocation) {
    return (
      <div className="flex items-center gap-3 text-white text-lg font-normal">
        <MapPin className="w-6 h-6 text-[rgba(94,173,237,1)]" strokeWidth={2} />
        <span>{selectedLocation}</span>
      </div>
    );
  }

  return (
    <Link
      to="/location-details"
      className="flex items-center gap-3 bg-[rgba(70,70,70,0.8)] backdrop-blur-md px-6 py-4 rounded-[20px] text-[rgba(203,203,203,1)] text-lg font-normal hover:bg-[rgba(80,80,80,0.8)] transition-colors border border-[rgba(255,255,255,0.1)]"
    >
      <MapPin className="w-6 h-6 text-[rgba(94,173,237,1)]" strokeWidth={2} />
      <span>Select a Location</span>
    </Link>
  );
};
