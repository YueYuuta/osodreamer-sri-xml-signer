import { CODIGO_RETENCION } from "../enums/codigo-retencion.enum";

export const TarifaRetencionXml: Record<CODIGO_RETENCION, number> = {
  // IVA
  [CODIGO_RETENCION.IVA_CientoPorCientoResolucion]: 1,
  [CODIGO_RETENCION.IVA_DocePorCientoPresuntivoEditores]: 0.12,
  [CODIGO_RETENCION.IVA_CientoPorCientoDistribuidores]: 100,
  [CODIGO_RETENCION.IVA_CientoPorCientoVoceadores]: 100,

  // Renta
  [CODIGO_RETENCION.RENTA_DosPorMil]: 0.2,
  [CODIGO_RETENCION.RENTA_TresPorMil]: 0.2,
};
