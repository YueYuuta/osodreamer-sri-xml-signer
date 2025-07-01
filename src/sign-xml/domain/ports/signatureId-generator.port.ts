import { SignatureIdentifiersInterface } from "../interfaces";

export interface SignatureIdGeneratorPort {
  generateAll(): SignatureIdentifiersInterface;
}
