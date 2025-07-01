import {
  InfrastructureError,
  InvalidP12PasswordError,
  InvalidP12StructureError,
  InvalidXmlStructureError,
  PrivateKeyExtractionError,
  SigningKeyNotFoundError,
  SignStrategyError,
  UanatacaCertificateNotFoundError,
  UnknownSignStrategyError,
} from "../errors";
import { HandledError } from "../interfaces";

export class ErrorHandler {
  static handle(error: unknown): HandledError {
    if (error instanceof UanatacaCertificateNotFoundError) {
      return {
        code: "UANATACA_CERT_NOT_FOUND",
        message: error.message,
        original: error,
      };
    }

    if (error instanceof SigningKeyNotFoundError) {
      return {
        code: "SIGNING_KEY_NOT_FOUND",
        message: error.message,
        original: error,
      };
    }

    if (error instanceof PrivateKeyExtractionError) {
      return {
        code: "PRIVATE_KEY_EXTRACTION_ERROR",
        message: error.message,
        original: error,
      };
    }

    if (error instanceof UnknownSignStrategyError) {
      return {
        code: "UNKNOWN_SIGN_STRATEGY",
        message: error.message,
        original: error,
      };
    }

    if (error instanceof SignStrategyError) {
      return {
        code: "SIGN_STRATEGY_ERROR",
        message: error.message,
        original: error,
      };
    }
    if (error instanceof InvalidXmlStructureError) {
      return {
        code: "XML_STRUCTURE_ERROR",
        message: error.message,
        original: error,
      };
    }
    if (error instanceof InvalidP12PasswordError) {
      return {
        code: "P12_PASSWORD_ERROR",
        message: error.message,
        original: error,
      };
    }
    if (error instanceof InvalidP12StructureError) {
      return {
        code: "P12_STRUCTURE_ERROR",
        message: error.message,
        original: error,
      };
    }

    if (error instanceof InfrastructureError) {
      return {
        code: "INFRASTRUCTURE_ERROR",
        message: error.message,
        original: error,
      };
    }

    if (error instanceof Error) {
      return {
        code: "UNHANDLED_ERROR",
        message: error.message,
        original: error,
      };
    }

    return {
      code: "UNKNOWN_ERROR",
      message: "Ha ocurrido un error desconocido",
      original: new Error(String(error)),
    };
  }
}
