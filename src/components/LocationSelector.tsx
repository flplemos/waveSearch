import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MapPin, Navigation2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { LOCATIONS, LocationKey } from "@/lib/locations";
import { getNearestLocations, NearbyLocation } from "@/lib/geo";

interface LocationSelectorProps {
  selectedLocation?: string;
}

const RN_FALLBACK_COORDS = { lat: -5.81, lng: -35.21 }; // Natal como fallback

const formatDistance = (distanceKm: number) =>
  distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`;

export const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedLocation }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [geoStatus, setGeoStatus] = useState<
    "idle" | "locating" | "ready" | "denied" | "unsupported" | "error" | "fallback"
  >("idle");
  const [nearbyLocations, setNearbyLocations] = useState<NearbyLocation[]>([]);

  const sortedLocations = useMemo(
    () => Object.entries(LOCATIONS).sort((a, b) => a[1].name.localeCompare(b[1].name)),
    []
  );

  const locationName = selectedLocation && LOCATIONS[selectedLocation as LocationKey]
    ? LOCATIONS[selectedLocation as LocationKey].name
    : "Selecione um local";

  const loadFromCoords = useCallback((coords: { lat: number; lng: number }) => {
    setNearbyLocations(getNearestLocations(coords, 15, 200));
  }, []);

  const requestLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoStatus("unsupported");
      loadFromCoords(RN_FALLBACK_COORDS);
      return;
    }

    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        loadFromCoords(coords);
        setGeoStatus("ready");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoStatus("denied");
        } else {
          setGeoStatus("error");
        }
        loadFromCoords(RN_FALLBACK_COORDS);
        setGeoStatus("fallback");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }, [loadFromCoords]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const handleSelect = (value: string) => {
    navigate(`/location/${value}`);
    setOpen(false);
  };

  const geoMessage = useMemo(() => {
    switch (geoStatus) {
      case "locating":
        return "Buscando praias perto de voce...";
      case "denied":
        return "Permita o acesso ao GPS para sugerir praias proximas.";
      case "unsupported":
        return "GPS nao disponivel; mostrando sugestoes do RN.";
      case "error":
        return "Nao deu para pegar sua localizacao; usando sugestoes do RN.";
      case "fallback":
        return "Mostrando praias por proximidade de Natal (fallback).";
      case "ready":
        return nearbyLocations.length ? "Praias ordenadas pela sua localizacao." : "Selecione um local.";
      default:
        return "Selecione ou use o GPS para ver praias proximas.";
    }
  }, [geoStatus, nearbyLocations.length]);

  const nearbyKeys = new Set(nearbyLocations.map((item) => item.key));
  const remainingLocations = sortedLocations.filter(([key]) => !nearbyKeys.has(key as LocationKey));

  return (
    <div className="w-full space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-auto items-center gap-3 bg-[rgba(70,70,70,0.85)] backdrop-blur-md px-6 py-4 rounded-[20px] text-white text-lg font-normal hover:bg-[rgba(80,80,80,0.9)] transition-colors border border-white/10 w-full border-none outline-none ring-0 focus:ring-0"
          >
            <MapPin className="w-6 h-6 text-[rgba(94,173,237,1)] shrink-0" strokeWidth={2} />
            <span className="truncate text-left flex-1">{locationName}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          className="p-0 w-[min(420px,90vw)] bg-[#0f1116]/95 text-white border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <Command className="bg-transparent text-white">
            <CommandInput
              autoFocus
              placeholder="Buscar praia pelo nome"
              className="h-11 text-sm text-white placeholder:text-white/60 border-b border-white/10 bg-transparent"
            />
            <CommandList className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded-full">
              <CommandEmpty className="px-3 py-4 text-sm text-white/60">Nenhuma praia encontrada.</CommandEmpty>

              {nearbyLocations.length > 0 && (
                <CommandGroup heading="Praias perto de voce" className="text-white/90">
                  {nearbyLocations.map((item) => (
                    <CommandItem
                      key={`near-${item.key}`}
                      value={item.key}
                      onSelect={handleSelect}
                      className="cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                    >
                      <div className="flex flex-col">
                        <span className="text-base">{item.name}</span>
                        <span className="text-xs text-white/60">{formatDistance(item.distanceKm)}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {nearbyLocations.length > 0 && <CommandSeparator className="bg-white/10" />}

              <CommandGroup heading="Todas as praias" className="text-white/90">
                {remainingLocations.map(([key, data]) => (
                  <CommandItem
                    key={key}
                    value={key}
                    onSelect={handleSelect}
                    className="cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    <span className="text-base">{data.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex items-center justify-between gap-2 text-xs text-white/70">
        <span className="truncate">{geoMessage}</span>
        <button
          type="button"
          onClick={requestLocation}
          className="inline-flex items-center gap-1 text-white hover:text-white/90 transition"
        >
          <Navigation2 className="w-4 h-4" />
          <span>Atualizar GPS</span>
        </button>
      </div>
    </div>
  );
};
