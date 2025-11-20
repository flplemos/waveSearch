import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS } from '@/lib/locations';

interface LocationSelectorProps {
  selectedLocation?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedLocation }) => {
  const navigate = useNavigate();

  // Busca o nome legível da praia baseada no ID (slug)
  // Se não achar, usa o texto padrão
  const locationName = selectedLocation && LOCATIONS[selectedLocation as keyof typeof LOCATIONS] 
    ? LOCATIONS[selectedLocation as keyof typeof LOCATIONS].name 
    : "Selecione um local";

  const handleValueChange = (value: string) => {
    // Redireciona para a nova rota, forçando a atualização da página
    navigate(`/location/${value}`);
  };

  return (
    <div className="w-full">
      <Select onValueChange={handleValueChange} value={selectedLocation}>
        <SelectTrigger className="flex h-auto items-center gap-3 bg-[rgba(70,70,70,0.8)] backdrop-blur-md px-6 py-4 rounded-[20px] text-[rgba(203,203,203,1)] text-lg font-normal hover:bg-[rgba(80,80,80,0.8)] transition-colors border border-[rgba(255,255,255,0.1)] w-full border-none outline-none ring-0 focus:ring-0">
          <div className="flex items-center gap-3 flex-1 text-left">
            <MapPin className="w-6 h-6 text-[rgba(94,173,237,1)] shrink-0" strokeWidth={2} />
            <span className="truncate text-white">
              {/* Mostramos o nome aqui diretamente para garantir o estilo */}
              {locationName}
            </span>
          </div>
        </SelectTrigger>
        
        <SelectContent className="bg-[#2a2a2a] border-[#444] text-white z-50 max-h-[300px]">
          {Object.entries(LOCATIONS).map(([key, data]) => (
            <SelectItem 
              key={key} 
              value={key} 
              className="focus:bg-[#3a3a3a] focus:text-white cursor-pointer py-3 text-base"
            >
              {data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};