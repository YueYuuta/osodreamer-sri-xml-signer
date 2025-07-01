// src/constants/sri-urls.ts
export const SRI_URLS = {
  test: {
    recepcion:
      "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl",
    autorizacion:
      "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl",
  },
  prod: {
    recepcion:
      "https://cel.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl",
    autorizacion:
      "https://cel.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl",
  },
} as const;

export type SRIEnv = keyof typeof SRI_URLS;
