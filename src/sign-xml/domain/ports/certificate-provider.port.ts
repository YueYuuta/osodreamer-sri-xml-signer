import { ParsedP12Certificate } from "../interfaces";

export interface CertificateProviderPort {
  getCertificateData(): Promise<ParsedP12Certificate>;
}
