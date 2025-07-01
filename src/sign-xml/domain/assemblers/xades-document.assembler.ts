import { SignatureIdentifiersInterface } from "../interfaces";

export class XadesDocumentAssembler {
  build(params: {
    ids: SignatureIdentifiersInterface;
    SignedInfo: string;
    signature: string;
    KeyInfo: string;
    SignedProperties: string;
  }): string {
    const { KeyInfo, SignedInfo, SignedProperties, ids, signature } = params;

    return [
      `<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature${ids.signatureNumber}">`,
      "\n" + SignedInfo,
      `\n<ds:SignatureValue Id="SignatureValue${ids.signatureValueNumber}">\n`,
      signature,
      "\n</ds:SignatureValue>",
      "\n" + KeyInfo,
      `\n<ds:Object Id="Signature${ids.signatureNumber}-Object${ids.ObjectNumber}">`,
      `<etsi:QualifyingProperties Target="#Signature${ids.signatureNumber}">`,
      SignedProperties,
      "</etsi:QualifyingProperties>",
      "</ds:Object>",
      "</ds:Signature>",
    ].join("");
  }
}
