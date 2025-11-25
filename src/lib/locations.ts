export type LocationData = {
  name: string;
  lat: number;
  lng: number;
  state?: string;
};

export const LOCATIONS: Record<string, LocationData> = {
  // Rio Grande do Norte
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
    name: "Praia do Madeiro - Tibau do Sul (RN)",
    lat: -6.1919,
    lng: -35.0481,
  },
  "tabatinga-rn": {
    name: "Tabatinga - Nisia Floresta (RN)",
    lat: -6.0508,
    lng: -35.0977,
  },
  "cotovelo": {
    name: "Cotovelo - Parnamirim (RN)",
    lat: -5.9819,
    lng: -35.1231,
  },
  "buzios-rn": {
    name: "Buzios - Nisia Floresta (RN)",
    lat: -5.9013,
    lng: -35.1267,
  },
  "pirangi": {
    name: "Pirangi do Norte - Parnamirim (RN)",
    lat: -5.9852,
    lng: -35.1551,
  },
  "santa-rita": {
    name: "Santa Rita - Extremoz (RN)",
    lat: -5.695,
    lng: -35.1487,
  },
  "sao-miguel-do-gostoso": {
    name: "Sao Miguel do Gostoso (RN)",
    lat: -5.1233,
    lng: -35.6359,
  },
  "touros": {
    name: "Touros (RN)",
    lat: -5.1983,
    lng: -35.4638,
  },

  // Ceara
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

  // Nordeste
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

  // Rio de Janeiro
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

  // Sao Paulo
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

  // Santa Catarina
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

  // Internacional
  "pipeline-hawaii": {
    name: "Pipeline - Oahu (Hawaii, EUA)",
    lat: 21.6643,
    lng: -158.0531,
  },
  "desert-point": {
    name: "Desert Point - Lombok (Indonesia)",
    lat: -8.7519,
    lng: 115.618,
  },
  "teahupoo": {
    name: "Teahupoo - Tahiti (Polinesia)",
    lat: -17.8333,
    lng: -149.2667,
  },
  "uluwatu": {
    name: "Uluwatu - Bali (Indonesia)",
    lat: -8.8296,
    lng: 115.0836,
  },
  "jeffreys-bay": {
    name: "Jeffreys Bay (Africa do Sul)",
    lat: -34.0506,
    lng: 24.9162,
  },
  "snapper-rocks": {
    name: "Snapper Rocks - Gold Coast (Australia)",
    lat: -28.165,
    lng: 153.543,
  },
};

export type LocationKey = keyof typeof LOCATIONS;
export type LocationDataEntry = { key: LocationKey } & LocationData;
