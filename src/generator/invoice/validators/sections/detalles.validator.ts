import { IVA_PERCENTAGE_CODE_ENUM, TAX_CODE_ENUM } from "../../../enums";

import { ComprobanteType } from "../../types";

export function validarDetalles(comprobante: ComprobanteType): string[] {
  const { detalles } = comprobante;
  const errors: string[] = [];

  detalles.detalle.forEach((detalle, index) => {
    // impuestos (obligatorio)

    const ivaPercentageCodes = Object.values(IVA_PERCENTAGE_CODE_ENUM);
    detalle.impuestos.impuesto.forEach((imp, j) => {
      if (imp.codigo === TAX_CODE_ENUM.VAT) {
        if (
          !ivaPercentageCodes.includes(
            imp.codigoPorcentaje.toString() as IVA_PERCENTAGE_CODE_ENUM
          )
        ) {
          errors.push(
            `detalle[${index}]: impuesto[${j}]: "codigoPorcentaje" debe ser un valor válido de IVA: ${ivaPercentageCodes.join(", ")}.`
          );
        }
      }
    });
  });

  return errors;
}
