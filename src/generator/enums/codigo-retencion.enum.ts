/**
 * Códigos de retención (IVA & Renta) según tablas oficiales
 */
export enum CODIGO_RETENCION {
  // ——— Retención IVA ———
  /**
   * 100% (aplica para retenciones de IVA de conformidad con Resolución No. NAC-DGERCGC21-00000063)
   * Tarifa en el XML: 1
   */
  IVA_CientoPorCientoResolucion = 3,

  /**
   * 12% (Retención de IVA presuntivo por Editores a Margen de Comercialización/Vocedores)
   * Tarifa en el XML: 0.12
   */
  IVA_DocePorCientoPresuntivoEditores = 4,

  /**
   * 100% (Retención de IVA venta periódicos y/o revistas a Distribuidores)
   * Tarifa en el XML: 100
   */
  IVA_CientoPorCientoDistribuidores = 5,

  /**
   * 100% (Retención de IVA venta de periódicos y/o revistas a voceadores)
   * Tarifa en el XML: 100
   */
  IVA_CientoPorCientoVoceadores = 6,

  // ——— Retención Renta ———
  /**
   * 0.002 (2 por mil)
   * Tarifa en el XML: 0.20
   */
  RENTA_DosPorMil = 327,

  /**
   * 0.003 (3 por mil)
   * Tarifa en el XML: 0.20
   */
  RENTA_TresPorMil = 328,
}
