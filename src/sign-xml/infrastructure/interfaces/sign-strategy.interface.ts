import * as forge from "node-forge";

export interface SignStrategy {
  supports(friendlyName: string): boolean;

  getPrivateKey(bags: forge.pkcs12.Bag[]): forge.pki.PrivateKey;

  overrideIssuerName(certBags: forge.pkcs12.Bag[]): string;
}
