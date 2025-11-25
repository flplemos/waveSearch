import { LOCATIONS, LocationKey } from "./locations";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type NearbyLocation = {
  key: LocationKey;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
};

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const calculateDistanceKm = (from: Coordinates, to: Coordinates) => {
  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

export const getNearestLocations = (coords: Coordinates, limit = 6): NearbyLocation[] =>
  Object.entries(LOCATIONS)
    .map(([key, data]) => ({
      key: key as LocationKey,
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      distanceKm: calculateDistanceKm(coords, { lat: data.lat, lng: data.lng }),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
