import React from 'react';
import { MenuButton } from '@/components/MenuButton';
import { LocationSelector } from '@/components/LocationSelector';
import { SearchButton } from '@/components/SearchButton';

const Search = () => {
  return (
    <main className="flex flex-col relative w-full min-h-screen bg-[rgba(45,45,45,1)]">
      <img
        src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80"
        className="absolute h-full w-full object-cover inset-0"
        alt="Ocean background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(45,45,45,0.3)] to-[rgba(45,45,45,0.6)]" />
      
      <div className="absolute top-6 right-6 z-20">
        <MenuButton />
      </div>
      
      <div className="flex flex-1 items-center justify-center z-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <LocationSelector />
        </div>
      </div>
      
      <footer className="relative z-10 pb-10 px-4">
        <div className="w-full max-w-md mx-auto">
          <SearchButton />
        </div>
      </footer>
    </main>
  );
};

export default Search;
