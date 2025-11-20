import React, { useState } from 'react';

export const SearchSection: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    console.log('Search activated');
    // Implement search functionality here
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSearchClick();
    }
  };

  return (
    <footer className="relative flex w-[89px] items-stretch gap-1 text-base text-[rgba(203,203,203,1)] font-semibold whitespace-nowrap mt-[129px]">
      <button
        onClick={handleSearchClick}
        onKeyDown={handleKeyDown}
        aria-label="Activate search"
        className={`flex items-center gap-1 p-2 rounded-lg transition-all duration-200 hover:bg-[rgba(45,45,45,0.3)] focus:outline-none focus:ring-2 focus:ring-[rgba(94,173,237,1)] ${
          isSearchActive ? 'bg-[rgba(94,173,237,0.2)]' : ''
        }`}
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/5e2ba1cdc684a4aafc403134a791c509c33b54bb?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[30px] shrink-0"
          alt="Search icon"
        />
        <span className="my-auto">Search</span>
      </button>
    </footer>
  );
};
