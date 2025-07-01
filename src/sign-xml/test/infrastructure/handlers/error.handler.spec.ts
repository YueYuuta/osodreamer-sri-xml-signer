import {
  UanatacaCertificateNotFoundError,
  SigningKeyNotFoundError,
  PrivateKeyExtractionError,
  UnknownSignStrategyError,
  SignStrategyError,
  InvalidXmlStructureError,
  InvalidP12PasswordError,
  InvalidP12StructureError,
  InfrastructureError,
} from "../../../infrastructure/errors";
import { ErrorHandler } from "../../../infrastructure/handlers";

describe("ErrorHandler", () => {
  it("should handle UanatacaCertificateNotFoundError", () => {
    const err = new UanatacaCertificateNotFoundError();
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("UANATACA_CERT_NOT_FOUND");
    expect(result.message).toBe("No se encontró el certificado para UANATACA.");
  });

  it("should handle SigningKeyNotFoundError", () => {
    const err = new SigningKeyNotFoundError("Key missing");
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("SIGNING_KEY_NOT_FOUND");
  });

  it("should handle PrivateKeyExtractionError", () => {
    const err = new PrivateKeyExtractionError("No PK");
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("PRIVATE_KEY_EXTRACTION_ERROR");
  });

  it("should handle UnknownSignStrategyError", () => {
    const err = new UnknownSignStrategyError("Unknown strategy");
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("UNKNOWN_SIGN_STRATEGY");
  });

  it("should handle SignStrategyError", () => {
    const err = new SignStrategyError("Fail strategy");
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("SIGN_STRATEGY_ERROR");
  });

  it("should handle InvalidXmlStructureError", () => {
    const err = new InvalidXmlStructureError("Bad XML");
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("XML_STRUCTURE_ERROR");
  });

  it("should handle InvalidP12PasswordError", () => {
    const err = new InvalidP12PasswordError();
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("P12_PASSWORD_ERROR");
  });

  it("should handle InvalidP12StructureError", () => {
    const err = new InvalidP12StructureError();
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("P12_STRUCTURE_ERROR");
  });

  it("should handle InfrastructureError", () => {
    const err = new InfrastructureError("Infra failure");
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("INFRASTRUCTURE_ERROR");
  });

  it("should handle generic Error", () => {
    const err = new Error("Generic");
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("UNHANDLED_ERROR");
    expect(result.message).toBe("Generic");
  });

  it("should handle unknown non-error", () => {
    const err = "algo inesperado";
    const result = ErrorHandler.handle(err);
    expect(result.code).toBe("UNKNOWN_ERROR");
    expect(result.message).toBe("Ha ocurrido un error desconocido");
    expect(result.original).toBeInstanceOf(Error);
  });
});
