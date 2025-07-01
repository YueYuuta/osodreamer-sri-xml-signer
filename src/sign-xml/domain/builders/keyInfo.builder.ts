import { XMLNS_ATTRIBUTE } from "../enums";

export class KeyInfoBuilder {
  build(params: {
    certificateNumber: string;
    certificateX509: string;
    modulus: string;
    exponent: string;
  }): string {
    const { certificateNumber, certificateX509, modulus, exponent } = params;

    return [
      `<ds:KeyInfo ${XMLNS_ATTRIBUTE} Id="Certificate${certificateNumber}">`,
      "\n<ds:X509Data>",
      "\n<ds:X509Certificate>\n",
      certificateX509,
      "\n</ds:X509Certificate>",
      "\n</ds:X509Data>",
      "\n<ds:KeyValue>",
      "\n<ds:RSAKeyValue>",
      "\n<ds:Modulus>\n",
      modulus,
      "\n</ds:Modulus>",
      "\n<ds:Exponent>",
      exponent,
      "</ds:Exponent>",
      "\n</ds:RSAKeyValue>",
      "\n</ds:KeyValue>",
      "\n</ds:KeyInfo>",
    ].join("");
  }
}
