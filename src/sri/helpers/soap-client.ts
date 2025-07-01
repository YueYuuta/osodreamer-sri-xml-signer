// src/helpers/soap-client.ts
import * as soap from "soap";

export async function createSoapClient(wsdlUrl: string): Promise<soap.Client> {
  return await soap.createClientAsync(wsdlUrl);
}
