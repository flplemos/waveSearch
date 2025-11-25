export type LocationData = {
  name: string;
  lat: number;
  lng: number;
  state?: string;
};

export const LOCATIONS: Record<string, LocationData> = {
  "ponta-negra": {
    name: "Ponta Negra - Natal (RN)",
    lat: -5.8731,
    lng: -35.1779,
  },
  "pipa": {
    name: "Pipa - Tibau do Sul (RN)",
    lat: -6.229,
    lng: -35.045,
  },
  "genipabu": {
    name: "Genipabu - Extremoz (RN)",
    lat: -5.7103,
    lng: -35.2031,
  },
  "madeiro": {
    name: "Praia do Madeiro (RN)",
    lat: -6.1919,
    lng: -35.0481,
  },
  "praia-do-futuro": {
    name: "Praia do Futuro - Fortaleza (CE)",
    lat: -3.7456,
    lng: -38.4499,
  },
  "cumbuco": {
    name: "Cumbuco (CE)",
    lat: -3.6248,
    lng: -38.715,
  },
  "taiba": {
    name: "Taiba (CE)",
    lat: -3.5048,
    lng: -39.1225,
  },
  "jericoacoara": {
    name: "Jericoacoara (CE)",
    lat: -2.796,
    lng: -40.5124,
  },
  "praia-do-frances": {
    name: "Praia do Frances (AL)",
    lat: -9.771,
    lng: -35.8445,
  },
  "porto-de-galinhas": {
    name: "Porto de Galinhas (PE)",
    lat: -8.5016,
    lng: -35.0055,
  },
  "maracaipe": {
    name: "Maracaipe (PE)",
    lat: -8.5271,
    lng: -35.016,
  },
  "cacimba": {
    name: "Cacimba do Padre - Noronha (PE)",
    lat: -3.8549,
    lng: -32.4436,
  },
  "barra-da-tijuca": {
    name: "Barra da Tijuca - Rio (RJ)",
    lat: -23.0104,
    lng: -43.3659,
  },
  "arpoador": {
    name: "Arpoador - Rio (RJ)",
    lat: -22.9883,
    lng: -43.1869,
  },
  "itacoatiara": {
    name: "Itacoatiara - Niteroi (RJ)",
    lat: -22.9546,
    lng: -43.0386,
  },
  "maresias": {
    name: "Maresias - Sao Sebastiao (SP)",
    lat: -23.7934,
    lng: -45.5597,
  },
  "itamambuca": {
    name: "Itamambuca - Ubatuba (SP)",
    lat: -23.4036,
    lng: -45.0037,
  },
  "pereque": {
    name: "Pereque-Acu - Ubatuba (SP)",
    lat: -23.422,
    lng: -45.0607,
  },
  "gonzaga": {
    name: "Gonzaga - Santos (SP)",
    lat: -23.9687,
    lng: -46.3336,
  },
  "guaruja": {
    name: "Guaruja - Pitangueiras (SP)",
    lat: -23.9954,
    lng: -46.2566,
  },
  "joaquina": {
    name: "Joaquina - Florianopolis (SC)",
    lat: -27.6314,
    lng: -48.4636,
  },
  "praia-mole": {
    name: "Praia Mole - Florianopolis (SC)",
    lat: -27.5987,
    lng: -48.4222,
  },
  "campeche": {
    name: "Campeche - Florianopolis (SC)",
    lat: -27.6732,
    lng: -48.4826,
  },
  "barra-da-lagoa": {
    name: "Barra da Lagoa - Florianopolis (SC)",
    lat: -27.5739,
    lng: -48.422,
  },
  "praia-do-rosa": {
    name: "Praia do Rosa - Imbituba (SC)",
    lat: -28.1269,
    lng: -48.6477,
  },
};

export type LocationKey = keyof typeof LOCATIONS;
export type LocationDataEntry = { key: LocationKey } & LocationData;
