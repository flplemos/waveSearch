import React from 'react';
import { Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SearchButton: React.FC = () => {
  return (
    <Link
      to="/search"
      className="flex items-center gap-3 text-white text-2xl font-medium hover:scale-105 transition-transform"
    >
      <Waves className="w-8 h-8" strokeWidth={2.5} />
      <span>Search</span>
    </Link>
  );
};
