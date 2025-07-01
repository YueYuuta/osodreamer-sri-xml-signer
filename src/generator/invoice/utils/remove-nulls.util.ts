import { InvoiceSriBuilder } from "../models";

export function removeNullFields(objeto: InvoiceSriBuilder): InvoiceSriBuilder {
  for (const clave in objeto) {
    if (
      objeto[clave] === null ||
      objeto[clave] === undefined ||
      objeto[clave] === "" ||
      (typeof objeto[clave] === "object" &&
        Object.keys(objeto[clave]).length === 0)
    ) {
      delete objeto[clave];
    } else if (typeof objeto[clave] === "object") {
      removeNullFields(objeto[clave]);
    }
  }
  return objeto;
}
