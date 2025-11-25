import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MapPin, Navigation2 } from "lucide-react";
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

const formatDistance = (distanceKm: number) =>
  distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`;

export const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedLocation }) => {
  const navigate = useNavigate();
  const [geoStatus, setGeoStatus] = useState<
    "idle" | "locating" | "ready" | "denied" | "unsupported" | "error"
  >("idle");
  const [nearbyLocations, setNearbyLocations] = useState<NearbyLocation[]>([]);

  const sortedLocations = useMemo(
    () => Object.entries(LOCATIONS).sort((a, b) => a[1].name.localeCompare(b[1].name)),
    []
  );

  const locationName = selectedLocation && LOCATIONS[selectedLocation as LocationKey]
    ? LOCATIONS[selectedLocation as LocationKey].name
    : "Selecione um local";

  const requestLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoStatus("unsupported");
      return;
    }

    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        // Busca locais dentro de 120 km; se faltar, completa com os mais proximos (limite 12)
        setNearbyLocations(getNearestLocations(coords, 12, 120));
        setGeoStatus("ready");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoStatus("denied");
        } else {
          setGeoStatus("error");
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const handleValueChange = (value: string) => {
    navigate(`/location/${value}`);
  };

  const geoMessage = useMemo(() => {
    switch (geoStatus) {
      case "locating":
        return "Buscando praias perto de voce...";
      case "denied":
        return "Permita o acesso ao GPS para sugerir praias proximas.";
      case "unsupported":
        return "GPS nao disponivel neste dispositivo.";
      case "error":
        return "Nao deu para pegar sua localizacao agora.";
      case "ready":
        return nearbyLocations.length ? "Praias ordenadas pela sua localizacao." : "Selecione um local.";
      default:
        return "Selecione ou use o GPS para ver praias proximas.";
    }
  }, [geoStatus, nearbyLocations.length]);

  return (
    <div className="w-full space-y-2">
      <Select onValueChange={handleValueChange} value={selectedLocation}>
        <SelectTrigger className="flex h-auto items-center gap-3 bg-[rgba(70,70,70,0.8)] backdrop-blur-md px-6 py-4 rounded-[20px] text-[rgba(203,203,203,1)] text-lg font-normal hover:bg-[rgba(80,80,80,0.8)] transition-colors border border-[rgba(255,255,255,0.1)] w-full border-none outline-none ring-0 focus:ring-0">
          <div className="flex items-center gap-3 flex-1 text-left">
            <MapPin className="w-6 h-6 text-[rgba(94,173,237,1)] shrink-0" strokeWidth={2} />
            <span className="truncate text-white">{locationName}</span>
          </div>
        </SelectTrigger>

        <SelectContent className="bg-[#2a2a2a] border-[#444] text-white z-50 max-h-[320px]">
          {nearbyLocations.length > 0 && (
            <SelectGroup>
              <SelectLabel className="text-xs text-white/70">Praias perto de voce</SelectLabel>
              {nearbyLocations.map((item) => (
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

          {nearbyLocations.length > 0 && <SelectSeparator className="bg-white/10" />}

          <SelectGroup>
            <SelectLabel className="text-xs text-white/70">Todas as praias</SelectLabel>
            {sortedLocations.map(([key, data]) => (
              <SelectItem
                key={key}
                value={key}
                className="focus:bg-[#3a3a3a] focus:text-white cursor-pointer py-3 text-base"
              >
                {data.name}
              </SelectItem>
            ))}
          </SelectGroup>
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
