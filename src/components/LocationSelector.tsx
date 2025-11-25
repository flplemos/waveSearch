import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Navigation2, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "@/components/ui/select";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [geoStatus, setGeoStatus] = useState<
    "idle" | "locating" | "ready" | "denied" | "unsupported" | "error" | "fallback"
  >("idle");
  const [nearbyLocations, setNearbyLocations] = useState<NearbyLocation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedLocations = useMemo(
    () => Object.entries(LOCATIONS).sort((a, b) => a[1].name.localeCompare(b[1].name)),
    []
  );

  const locationName = selectedLocation && LOCATIONS[selectedLocation as LocationKey]
    ? LOCATIONS[selectedLocation as LocationKey].name
    : "Selecione um local";

  const loadFromCoords = useCallback((coords: { lat: number; lng: number }) => {
    // Permite ate 15 praias, prioriza dentro de 200 km
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
        // fallback para Natal quando GPS falha/negado
        loadFromCoords(RN_FALLBACK_COORDS);
        setGeoStatus("fallback");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }, [loadFromCoords]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const handleValueChange = (value: string) => {
    navigate(`/location/${value}`);
    setOpen(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      // Foca o input quando abrir para digitar direto
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearchTerm("");
    }
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

  const searchLower = searchTerm.toLowerCase();
  const filterMatch = (text: string) => text.toLowerCase().includes(searchLower);

  const filteredNearby = useMemo(
    () =>
      nearbyLocations.filter((item) =>
        !searchTerm ? true : filterMatch(item.name) || filterMatch(item.key)
      ),
    [nearbyLocations, searchTerm]
  );

  const filteredAll = useMemo(
    () =>
      sortedLocations.filter(([key, data]) =>
        !searchTerm ? true : filterMatch(data.name) || filterMatch(key)
      ),
    [searchTerm, sortedLocations]
  );

  const stopPropagationKeys = {
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => e.stopPropagation(),
    onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => e.stopPropagation(),
    onClick: (e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation(),
  };

  return (
    <div className="w-full space-y-2">
      <Select onValueChange={handleValueChange} value={selectedLocation} open={open} onOpenChange={handleOpenChange}>
        <SelectTrigger className="flex h-auto items-center gap-3 bg-[rgba(70,70,70,0.8)] backdrop-blur-md px-6 py-4 rounded-[20px] text-[rgba(203,203,203,1)] text-lg font-normal hover:bg-[rgba(80,80,80,0.8)] transition-colors border border-[rgba(255,255,255,0.1)] w-full border-none outline-none ring-0 focus:ring-0">
          <div className="flex items-center gap-3 flex-1 text-left">
            <MapPin className="w-6 h-6 text-[rgba(94,173,237,1)] shrink-0" strokeWidth={2} />
            <span className="truncate text-white">{locationName}</span>
          </div>
        </SelectTrigger>

        <SelectContent className="bg-[#2a2a2a] border-[#444] text-white z-50 max-h-[360px]">
          <div className="sticky top-0 z-10 bg-[#2a2a2a] px-3 pt-3 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 rounded-md border border-white/10 bg-[#1f1f1f] px-3 py-2">
              <SearchIcon className="w-4 h-4 text-white/60" />
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar praia pelo nome"
                className="bg-transparent text-sm text-white placeholder:text-white/50 outline-none w-full"
                spellCheck={false}
                {...stopPropagationKeys}
              />
            </div>
          </div>

          {filteredNearby.length > 0 && (
            <SelectGroup>
              <SelectLabel className="text-xs text-white/70">Praias perto de voce</SelectLabel>
              {filteredNearby.map((item) => (
                <SelectItem
                  key={`near-${item.key}`}
                  value={item.key}
                  className="focus:bg-[#3a3a3a] focus:text-white cursor-pointer py-3 text-base"
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-white/60">{formatDistance(item.distanceKm)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {filteredNearby.length > 0 && <SelectSeparator className="bg-white/10" />}

          <SelectGroup>
            <SelectLabel className="text-xs text-white/70">Todas as praias</SelectLabel>
            {filteredAll.map(([key, data]) => (
              <SelectItem
                key={key}
                value={key}
                className="focus:bg-[#3a3a3a] focus:text-white cursor-pointer py-3 text-base"
              >
                {data.name}
              </SelectItem>
            ))}
          </SelectGroup>

          {searchTerm && filteredNearby.length === 0 && filteredAll.length === 0 && (
            <div className="px-3 py-4 text-sm text-white/60">Nenhuma praia encontrada.</div>
          )}
        </SelectContent>
      </Select>

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
