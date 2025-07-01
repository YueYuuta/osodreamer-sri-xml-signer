import { ComprobanteType } from "../types";
import {
  validarDetalles,
  validateInfoFactura,
  validarRetenciones,
} from "./sections";

export function validateFactura(data: ComprobanteType): string[] {
  const errors: string[] = [];
  errors.push(...validarDetalles(data));
  errors.push(...validateInfoFactura(data));
  errors.push(...validarRetenciones(data));

  return errors;
}
