import { SignXmlUseCase } from "../../application/use-cases";
import { ParsedP12Certificate } from "../../domain/interfaces";
import { XadesSignatureService } from "../../domain/xades-signature.service";
import { XmlSignatureInjector } from "../../infrastructure/XmlSignatureInjector";

describe("SignXmlUseCase", () => {
  const signerService: jest.Mocked<XadesSignatureService> = {
    sign: jest.fn(),
  } as any;

  const injector: jest.Mocked<XmlSignatureInjector> = {
    insertSignature: jest.fn(),
  } as any;

  const useCase = new SignXmlUseCase(signerService, injector);

  const certData: ParsedP12Certificate = {
    certificate: {} as any,
    certificateX509: "mockCertX509",
    serialNumber: "123456789",
    base64Der: "base64Hash",
    issuerName: "CN=Issuer",
    privateKey: {} as any,
    publicKey: {
      modulus: "modBase64",
      exponent: "expBase64",
    },
  };

  it("debería firmar e insertar la firma en el XML correctamente", async () => {
    const xml = "<Factura>contenido</Factura>";

    signerService.sign.mockResolvedValueOnce({
      xadesBes: "<ds:Signature>firmaGenerada</ds:Signature>",
    });

    injector.insertSignature.mockReturnValueOnce("<FacturaFirmada/>");

    const result = await useCase.execute({ xmlToSign: xml, certData });

    expect(signerService.sign).toHaveBeenCalledWith({
      xmlToSign: xml,
      certData,
    });
    expect(injector.insertSignature).toHaveBeenCalledWith(
      "<ds:Signature>firmaGenerada</ds:Signature>"
    );
    expect(result).toBe("<FacturaFirmada/>");
  });
});
