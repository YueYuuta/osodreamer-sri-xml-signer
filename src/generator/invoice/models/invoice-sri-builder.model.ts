import {
  TAX_CODE_ENUM,
  CODIGO_RETENCION_ENUM,
  IMPUESTO_A_RETENER_ENUM,
} from "../../enums";

export interface InvoiceSriBuilder {
  factura: FacturaInfo;
}

export interface FacturaInfo {
  $: {
    id: string;
    version: string;
  };
  infoTributaria: InfoTributaria;
  infoFactura: InfoFactura;
  detalles: Detalles;

  retenciones: Retenciones;

  infoAdicional: InfoAdicional;
}
export class Retenciones {
  retencion: Retencion[];
}
export class Retencion {
  codigo: IMPUESTO_A_RETENER_ENUM;

  codigoPorcentaje: CODIGO_RETENCION_ENUM;

  tarifa: string; //TODO: TIENE QUE TENER MAX 4 2 ENTEROS Y DOS DECIMALES

  valor: string;
}
export interface InfoTributaria {
  ambiente: number;
  tipoEmision: string;
  razonSocial: string;
  nombreComercial: string;
  ruc: string;
  claveAcceso: string;
  codDoc: string;
  estab: string;
  ptoEmi: string;
  secuencial: string;
  dirMatriz: string;
  contribuyenteRimpe?: string;
  agenteRetencion?: string;
}

export interface InfoFactura {
  fechaEmision: string;
  dirEstablecimiento: string;
  contribuyenteEspecial?: string;
  obligadoContabilidad?: "SI" | "NO";
  comercioExterior?: string;
  incoTermFactura?: string;
  lugarIncoTerm?: string;
  paisOrigen?: string;
  puertoEmbarque?: string;
  puertoDestino?: string;
  paisDestino?: string;
  paisAdquisicion?: string;
  tipoIdentificacionComprador: string;
  guiaRemision?: string;
  razonSocialComprador: string;
  identificacionComprador: string;
  direccionComprador: string;
  totalSinImpuestos: string;
  incoTermTotalSinImpuestos?: string;
  totalDescuento: string;

  totalConImpuestos: {
    totalImpuesto: TotalImpuesto[];
  };
  propina: string;
  fleteInternacional?: number;
  seguroInternacional?: number;
  gastosAduaneros?: number;
  gastosTransporteOtros?: number;
  importeTotal: string;
  moneda: string;
  pagos: { pago: Pago[] };

  valorRetIva?: string;

  valorRetRenta?: string;
}
export interface TotalImpuesto {
  codigo: TAX_CODE_ENUM;
  codigoPorcentaje: string;
  baseImponible: string;
  valor: string;
  descuentoAdicional?: string;
}

export interface Detalles {
  detalle: Detalle[];
}

export interface Pago {
  formaPago: string;
  total: string;
  plazo: number;
  unidadTiempo: string;
}

export interface Detalle {
  codigoPrincipal: string;
  codigoAuxiliar: string;
  descripcion: string;
  cantidad: string;
  precioUnitario: string;
  descuento: string;
  precioTotalSinImpuesto: string;
  detallesAdicionales?: {
    detAdicional: DetAdicional[];
  };
  impuestos: {
    impuesto: ImpuestoDetalle[];
  };
}

export interface DetAdicional {
  $: {
    nombre: string;
    valor: string;
  };
}

export interface ImpuestoDetalle {
  codigo: TAX_CODE_ENUM;
  codigoPorcentaje: string;
  tarifa: string;
  baseImponible: string;
  valor: string;
}
export interface InfoAdicional {
  campoAdicional: CampoAdicional[];
}

export interface CampoAdicional {
  $: {
    nombre: string;
  };
  _: string;
}
