import React from 'react';
import { MenuDropdown } from './MenuDropdown';

export const MenuButton: React.FC = () => {
  return (
    <div className="absolute top-[120px] right-[26px] z-10">
      <MenuDropdown />
    </div>
  );
};
