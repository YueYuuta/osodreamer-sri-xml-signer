import { InvoiceSriBuilder } from "./invoice-sri-builder.model";

export interface ResponseGenerateXmlModel {
  invoiceJson: InvoiceSriBuilder;
  generatedXml: string;
}
