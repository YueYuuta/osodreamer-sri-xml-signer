import { XadesBesResultInterface } from "../../domain/interfaces";
import {
  ClockPort,
  HashProviderPort,
  SignatureIdGeneratorPort,
} from "../../domain/ports";
import { SignatureData } from "../../domain/signature-data";
import { XadesSignatureService } from "../../domain/xades-signature.service";

const clock: ClockPort = {
  nowISO: jest.fn(() => "2025-06-28T12:00:00Z"),
};

const canonicalizer = {
  canonicalize: jest.fn(async (xml) => `<Canon>${xml}</Canon>`),
};
const hasher: HashProviderPort = {
  sha1Base64: jest.fn((input) => `sha1(${input})`),
  sha1RawBase64: jest.fn((input) => `sha1raw(${Array.from(input).join(",")})`),
};

const idGenerator: SignatureIdGeneratorPort = {
  generateAll: jest.fn(() => ({
    objectNumber: "obj123",
    signatureNumber: "sig456",
    signedPropertiesNumber: "sp789",
    referenceIdNumber: "ref321",
    certificateNumber: "999",
    ObjectNumber: "122",
    signatureValueNumber: "fsdgfg",
    signedInfoNumber: "6777",
    signedPropertiesIdNumber: "vhjhvjvh",
  })),
};

const signer = {
  signSha1RsaBase64: jest.fn(() => "firmaBase64"),
};

// 🔧 Datos simulados
const signatureData: SignatureData = {
  xmlToSign: "<Factura>contenido</Factura>",
  certData: {
    issuerName: "CN=Autoridad,O=Certificadora",
    base64Der: "certBase64Hash",
    certificateX509: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...",
    serialNumber: "1234567890",
    publicKey: {
      modulus: "modulusBase64",
      exponent: "exponentBase64",
    },
    certificate: {} as any, // opcional si no se usa directamente
    privateKey: {} as any, // opcional si no se usa directamente
  },
};

describe("XadesSignatureService", () => {
  let service: XadesSignatureService;

  beforeEach(() => {
    service = new XadesSignatureService(
      clock,
      canonicalizer,
      hasher,
      idGenerator,
      signer
    );
  });

  it("debería generar una firma XAdES-BES correctamente", async () => {
    const result: XadesBesResultInterface = await service.sign(signatureData);

    expect(idGenerator.generateAll).toHaveBeenCalled();
    expect(canonicalizer.canonicalize).toHaveBeenCalledWith(
      "<Factura>contenido</Factura>"
    );
    expect(hasher.sha1Base64).toHaveBeenCalledWith(
      expect.stringContaining("<Canon>")
    );
    expect(hasher.sha1Base64).toHaveBeenCalledWith(
      expect.stringContaining("SignedProperties")
    );
    expect(hasher.sha1Base64).toHaveBeenCalledWith(
      expect.stringContaining("KeyInfo")
    );
    expect(signer.signSha1RsaBase64).toHaveBeenCalled();

    expect(result).toHaveProperty("xadesBes");
    expect(result.xadesBes).toMatch(/<ds:Signature.*<\/ds:Signature>/s); // si se genera correctamente el XML final
  });
});
