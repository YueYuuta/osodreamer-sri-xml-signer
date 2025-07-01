import {
  ClockPort,
  CanonicalizerPort,
  SignatureIdGeneratorPort,
  SignerPort,
  HashProviderPort,
} from "./ports";
import { SignatureData } from "./signature-data";

import {
  SignedPropertiesBuilder,
  KeyInfoBuilder,
  SignedInfoBuilder,
} from "./builders";
import { XadesDocumentAssembler } from "./assemblers";

import { utf8Encode } from "../../utils";
import { XadesBesResultInterface } from "./interfaces";

export class XadesSignatureService {
  constructor(
    private readonly clock: ClockPort,
    private readonly canonicalizer: CanonicalizerPort,
    private readonly hasher: HashProviderPort,
    private readonly idGenerator: SignatureIdGeneratorPort,
    private readonly signer: SignerPort
  ) {}

  async sign(data: SignatureData): Promise<XadesBesResultInterface> {
    const ids = this.idGenerator.generateAll();
    const { certData, xmlToSign } = data;
    const { issuerName } = certData;

    const canonicalizedXml = await this.canonicalizer.canonicalize(xmlToSign);
    console.log(
      "🚀 ~ XadesSignatureService ~ sign ~ canonicalizedXml:",
      canonicalizedXml
    );
    const digestXml = this.hasher.sha1Base64(utf8Encode(canonicalizedXml));

    const certDigest = certData.base64Der;

    const serialNumber = certData.serialNumber;
    const certificateX509 = certData.certificateX509;
    const modulus = certData.publicKey.modulus;
    const exponent = certData.publicKey.exponent;

    const signedPropsBuilder = new SignedPropertiesBuilder(this.clock);
    const SignedProperties = signedPropsBuilder.build({
      signatureNumber: ids.signatureNumber,
      signedPropertiesNumber: ids.signedPropertiesNumber,
      certificateX509_der_hash: certDigest,
      issuerName: issuerName,
      X509SerialNumber: serialNumber,
      referenceIdNumber: ids.referenceIdNumber,
    });

    const sha1_SignedProperties = this.hasher.sha1Base64(
      utf8Encode(SignedProperties)
    );

    const KeyInfo = new KeyInfoBuilder().build({
      certificateNumber: ids.certificateNumber.toString(),
      certificateX509,
      modulus,
      exponent,
    });

    const sha1_certificado = this.hasher.sha1Base64(KeyInfo);

    const SignedInfo = new SignedInfoBuilder().build({
      ids,
      sha1_SignedProperties,
      sha1_certificado,
      sha1_comprobante: digestXml,
    });

    const signatureValue = this.signer.signSha1RsaBase64(SignedInfo);

    const xadesBes = new XadesDocumentAssembler().build({
      ids,
      SignedInfo,
      signature: signatureValue,
      KeyInfo,
      SignedProperties,
    });

    return { xadesBes };
  }
}
