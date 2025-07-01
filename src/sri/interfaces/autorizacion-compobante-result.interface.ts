export interface SriAuthorizationMessage {
  identificador: string;
  mensaje: string;
  tipo: string;
  informacionAdicional?: string;
}

export interface SriAuthorizationResult {
  claveAcceso: string;
  estadoAutorizacion: string;
  comprobante: string;
  rucEmisor: string;
  fechaAutorizacion: string;
  ambiente: string;
  mensajes: SriAuthorizationMessage[] | null;
}
