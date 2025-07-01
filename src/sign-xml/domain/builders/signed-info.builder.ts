import {
  CANONICALIZATION_ALGORITHMS,
  DIGEST_ALGORITHMS,
  SIGNATURE_ALGORITHMS,
  TRANSFORM_ALGORITHMS,
  XADES_URIS,
  XMLNS_ATTRIBUTE,
} from "../enums";
import { SignatureIdentifiersInterface } from "../interfaces";

export class SignedInfoBuilder {
  build(params: {
    ids: SignatureIdentifiersInterface;
    sha1_SignedProperties: string;
    sha1_certificado: string;
    sha1_comprobante: string;
  }): string {
    const { ids, sha1_SignedProperties, sha1_certificado, sha1_comprobante } =
      params;

    return [
      `<ds:SignedInfo ${XMLNS_ATTRIBUTE} Id="Signature-SignedInfo${ids.signedInfoNumber}">`,
      `\n<ds:CanonicalizationMethod Algorithm="${CANONICALIZATION_ALGORITHMS.XML_C14N_20010315}">`,
      "</ds:CanonicalizationMethod>",
      `\n<ds:SignatureMethod Algorithm="${SIGNATURE_ALGORITHMS.RSA_SHA1}">`,
      "</ds:SignatureMethod>",
      `\n<ds:Reference Id="SignedPropertiesID${ids.signedPropertiesIdNumber}" Type="${XADES_URIS.SIGNED_PROPERTIES}" URI="#Signature${ids.signatureNumber}-SignedProperties${ids.signedPropertiesNumber}">`,
      `\n<ds:DigestMethod Algorithm="${DIGEST_ALGORITHMS.SHA1}">`,
      "</ds:DigestMethod>",
      "\n<ds:DigestValue>",
      sha1_SignedProperties,
      "</ds:DigestValue>",
      "\n</ds:Reference>",
      `\n<ds:Reference URI="#Certificate${ids.certificateNumber}">`,
      `\n<ds:DigestMethod Algorithm="${DIGEST_ALGORITHMS.SHA1}">`,
      "</ds:DigestMethod>",
      "\n<ds:DigestValue>",
      sha1_certificado,
      "</ds:DigestValue>",
      "\n</ds:Reference>",
      `\n<ds:Reference Id="Reference-ID-${ids.referenceIdNumber}" URI="#comprobante">`,
      "\n<ds:Transforms>",
      `\n<ds:Transform Algorithm="${TRANSFORM_ALGORITHMS.ENVELOPED_SIGNATURE}">`,
      "</ds:Transform>",
      "\n</ds:Transforms>",
      `\n<ds:DigestMethod Algorithm="${DIGEST_ALGORITHMS.SHA1}">`,
      "</ds:DigestMethod>",
      "\n<ds:DigestValue>",
      sha1_comprobante,
      "</ds:DigestValue>",
      "\n</ds:Reference>",
      "\n</ds:SignedInfo>",
    ].join("");
  }
}
