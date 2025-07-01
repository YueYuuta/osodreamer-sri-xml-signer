import { ParsedP12Certificate } from "./interfaces/parsed-p12-certificate.interface";

export interface SignatureData {
  xmlToSign: string;
  certData: ParsedP12Certificate;
}
