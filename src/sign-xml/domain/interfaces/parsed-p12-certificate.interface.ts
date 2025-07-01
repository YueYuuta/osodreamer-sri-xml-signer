import * as forge from "node-forge";
export interface ParsedP12Certificate {
  certificate: forge.pki.Certificate;
  privateKey: forge.pki.PrivateKey;
  issuerName: string;
  serialNumber: string;
  certificateX509: string;
  base64Der: string;
  publicKey: {
    modulus: string;
    exponent: string;
  };
}
