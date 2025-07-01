import { BaseSRIError } from "./base-sri.error";

export class SRIRejectedError extends BaseSRIError {
  constructor(params: {
    estado: string;
    identificador: string;
    mensaje: string;
    informacionAdicional: string;
    tipo: string;
    claveAcceso: string;
  }) {
    super(params);
  }
}
