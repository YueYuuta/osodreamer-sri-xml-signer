/**
 * Códigos de retención (IVA & Renta) según tablas oficiales
 */
export enum CODIGO_RETENCION_ENUM {
  // ——— Retención IVA ———
  /**
   * 100% (aplica para retenciones de IVA de conformidad con Resolución No. NAC-DGERCGC21-00000063)
   * Tarifa en el XML: 1
   */
  IVA_CIENTO_POR_CIENTO_RESOLUCION = 3,

  /**
   * 12% (Retención de IVA presuntivo por Editores a Margen de Comercialización/Vocedores)
   * Tarifa en el XML: 0.12
   */
  IVA_DOCE_POR_CIENTO_PRESUNTIVO_EDITORES = 4,

  /**
   * 100% (Retención de IVA venta periódicos y/o revistas a Distribuidores)
   * Tarifa en el XML: 100
   */
  IVA_CIENTO_POR_CIENTO_DISTRIBUIDORES = 5,

  /**
   * 100% (Retención de IVA venta de periódicos y/o revistas a voceadores)
   * Tarifa en el XML: 100
   */
  IVA_CIENTO_POR_CIENTO_VOCEADORES = 6,

  // ——— Retención Renta ———
  /**
   * 0.002 (2 por mil)
   * Tarifa en el XML: 0.20
   */
  RENTA_DOS_POR_MIL = 327,

  /**
   * 0.003 (3 por mil)
   * Tarifa en el XML: 0.20
   */
  RENTA_TRES_POR_MIL = 328,
}
