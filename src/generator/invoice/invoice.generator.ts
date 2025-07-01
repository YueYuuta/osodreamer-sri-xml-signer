import { InvoiceXmlFactory } from "./factory";

import { Builder } from "xml2js";
import { removeNullFields } from "./utils";
import { validateFactura } from "./validators/factura-validator";

import {
  toDecorated,
  validateObject,
} from "../../lightweight-validator/validations/object.validation";
import { ValidationException } from "../exceptions/validation.exception";
import { ResponseGenerateXmlModel } from "./models";
import { ComprobanteType } from "./types/comprobante.type";
import { ComprobanteModel } from "./models/comprobante.model";

export async function generateXmlInvoice(
  invoice: ComprobanteType
): Promise<ResponseGenerateXmlModel> {
  const user = toDecorated(ComprobanteModel, invoice);
  const errorsObject = validateObject(user);
  const errorsValidate = validateFactura(invoice);
  const errors = [...errorsObject, ...errorsValidate];
  if (errors.length > 0) {
    throw new ValidationException(errors);
  }
  const factura = new InvoiceXmlFactory().create(invoice);
  const cleaned = removeNullFields(factura);
  const xml = new Builder({ renderOpts: { pretty: true } }).buildObject(
    cleaned
  );
  return {
    generatedXml: xml,
    invoiceJson: cleaned,
  };
}
