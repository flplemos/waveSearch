import React from 'react';

interface StatusBarProps {
  time?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ time = "16:20" }) => {
  return (
    <header className="relative bg-[rgba(45,45,45,1)] self-stretch flex w-full items-stretch gap-[40px_100px] px-[26px] py-[23px]">
      <time className="text-[rgba(203,203,203,1)] text-sm font-medium">
        {time}
      </time>
      <div className="flex items-stretch gap-[7px] flex-1" role="group" aria-label="Status indicators">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/7f9ff36a5a9b172658d3e84177b12a02ff6ff3ea?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-3 shrink-0"
          alt="Signal strength"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b9d6babbe1cd0ae0c8ab71ffacbb5063ac6380cb?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[15px] shrink-0"
          alt="WiFi status"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/9d94dfd9f9d92f83b17d3c6259557dd90fc067af?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[15px] shrink-0"
          alt="Battery level"
        />
      </div>
    </header>
  );
};
