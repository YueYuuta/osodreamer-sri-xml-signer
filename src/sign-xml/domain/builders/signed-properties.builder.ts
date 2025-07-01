import { DIGEST_ALGORITHMS, XMLNS_ATTRIBUTE } from "../enums";
import { ClockPort } from "../ports";

export class SignedPropertiesBuilder {
  constructor(private readonly clock: ClockPort) {}

  build(params: {
    signatureNumber: string;
    signedPropertiesNumber: string;
    certificateX509_der_hash: string;
    issuerName: string;
    X509SerialNumber: string;
    referenceIdNumber: string;
  }): string {
    const {
      signatureNumber,
      signedPropertiesNumber,
      certificateX509_der_hash,
      issuerName,
      X509SerialNumber,
      referenceIdNumber,
    } = params;

    const timestamp = this.clock.nowISO();

    return [
      `<etsi:SignedProperties ${XMLNS_ATTRIBUTE} Id="Signature${signatureNumber}-SignedProperties${signedPropertiesNumber}">`,
      "<etsi:SignedSignatureProperties>",
      "<etsi:SigningTime>",
      timestamp,
      "</etsi:SigningTime>",
      "<etsi:SigningCertificate>",
      "<etsi:Cert>",
      "<etsi:CertDigest>",
      `<ds:DigestMethod Algorithm="${DIGEST_ALGORITHMS.SHA1}">`,
      "</ds:DigestMethod>",
      "<ds:DigestValue>",
      certificateX509_der_hash,
      "</ds:DigestValue>",
      "</etsi:CertDigest>",
      "<etsi:IssuerSerial>",
      "<ds:X509IssuerName>",
      issuerName,
      "</ds:X509IssuerName>",
      "<ds:X509SerialNumber>",
      X509SerialNumber,
      "</ds:X509SerialNumber>",
      "</etsi:IssuerSerial>",
      "</etsi:Cert>",
      "</etsi:SigningCertificate>",
      "</etsi:SignedSignatureProperties>",
      "<etsi:SignedDataObjectProperties>",
      `<etsi:DataObjectFormat ObjectReference="#Reference-ID-${referenceIdNumber}">`,
      "<etsi:Description>contenido comprobante</etsi:Description>",
      "<etsi:MimeType>text/xml</etsi:MimeType>",
      "</etsi:DataObjectFormat>",
      "</etsi:SignedDataObjectProperties>",
      "</etsi:SignedProperties>",
    ].join("");
  }
}
