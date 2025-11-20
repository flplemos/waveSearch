// ARQUIVO: src/lib/locations.ts

// A palavra 'export' é OBRIGATÓRIA aqui para funcionar
export const LOCATIONS = {
  "ponta-negra": { 
    name: "Ponta Negra, Natal", 
    lat: -5.8731, 
    lng: -35.1779 
  },
  "pipa": { 
    name: "Praia da Pipa, Tibau do Sul", 
    lat: -6.2290, 
    lng: -35.0450 
  },
  "maresias": { 
    name: "Maresias, São Sebastião", 
    lat: -23.7934, 
    lng: -45.5597 
  },
  "joaquina": { 
    name: "Joaquina, Florianópolis", 
    lat: -27.6314, 
    lng: -48.4636 
  },
  "cacimba": { 
    name: "Cacimba do Padre, Noronha", 
    lat: -3.8549, 
    lng: -32.4436 
  }
};

export type LocationKey = keyof typeof LOCATIONS;