import { ParsedP12Certificate } from "../domain/interfaces";
import { XadesSignatureService } from "../domain/xades-signature.service";
import { XmlSignatureInjector } from "../infrastructure/XmlSignatureInjector";

export class SignXmlUseCase {
  constructor(
    private readonly signerService: XadesSignatureService,
    private readonly injector: XmlSignatureInjector
  ) {}

  async execute(input: {
    xmlToSign: string;
    certData: ParsedP12Certificate;
  }): Promise<string> {
    const { xmlToSign, certData } = input;

    const signatureXml = await this.signerService.sign({
      xmlToSign,
      certData,
    });
    const finalXml = this.injector.insertSignature(signatureXml.xadesBes);
    return finalXml;
  }
}
