import { SRIError } from "./base-sri.error";

export class SRIAutorizacionError extends Error {
  readonly estado: string;
  readonly identificador: string;
  readonly mensajeSRI: string;
  readonly informacionAdicional: string;
  readonly tipo: string;
  readonly claveAcceso: string;
  readonly ambiente?: string;
  readonly comprobanteXml?: string;

  constructor(params: {
    estado: string;
    identificador: string;
    mensaje: string;
    informacionAdicional: string;
    tipo: string;
    claveAcceso: string;
    ambiente?: string;
    comprobanteXml?: string;
  }) {
    const msg = `[SRI-${params.tipo}] ${params.mensaje} (ID ${params.identificador}) - ${params.informacionAdicional}`;
    super(msg);

    this.estado = params.estado;
    this.identificador = params.identificador;
    this.mensajeSRI = params.mensaje;
    this.informacionAdicional = params.informacionAdicional;
    this.tipo = params.tipo;
    this.claveAcceso = params.claveAcceso;
    this.ambiente = params.ambiente;
    this.comprobanteXml = params.comprobanteXml;
  }
}

export class SRIUnauthorizedError extends SRIError {
  constructor(public readonly estado: string) {
    super(`Estado del comprobante: ${estado}`);
    this.name = "SRIUnauthorizedError";
  }
}
