export abstract class BaseSRIError extends Error {
  readonly estado: string;
  readonly identificador: string;
  readonly mensajeSRI: string;
  readonly informacionAdicional: string;
  readonly tipo: string;
  readonly claveAcceso: string;

  constructor(params: {
    estado: string;
    identificador: string;
    mensaje: string;
    informacionAdicional: string;
    tipo: string;
    claveAcceso: string;
    customMessage?: string;
  }) {
    const fullMessage =
      params.customMessage ??
      `[SRI-${params.tipo}] ${params.mensaje} (ID ${params.identificador}) - ${params.informacionAdicional}`;
    super(fullMessage);

    this.estado = params.estado;
    this.identificador = params.identificador;
    this.mensajeSRI = params.mensaje;
    this.informacionAdicional = params.informacionAdicional;
    this.tipo = params.tipo;
    this.claveAcceso = params.claveAcceso;
  }
}

export class SRIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SRIError";
  }
}
