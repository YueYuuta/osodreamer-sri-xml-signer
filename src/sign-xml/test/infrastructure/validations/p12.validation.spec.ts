import * as forge from "node-forge";
import { assertIsValidP12OrThrow } from "../../../infrastructure/validations/p12.validation";
import {
  InvalidP12PasswordError,
  InvalidP12StructureError,
} from "../../../infrastructure/errors";

// 🧪 Mock de forge
jest.mock("node-forge", () => {
  const originalModule = jest.requireActual("node-forge");
  return {
    ...originalModule,
    asn1: {
      fromDer: jest.fn(),
    },
    util: {
      createBuffer: jest.fn(),
    },
    pkcs12: {
      pkcs12FromAsn1: jest.fn(),
    },
  };
});

describe("assertIsValidP12OrThrow", () => {
  const mockBuffer = Buffer.from([0x30, 0x82, 0x03, 0x39]); // Dummy DER-like buffer

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw InvalidP12StructureError if ASN.1 parsing fails", () => {
    (forge.asn1.fromDer as jest.Mock).mockImplementation(() => {
      throw new Error("ASN1 Error");
    });

    expect(() => assertIsValidP12OrThrow(mockBuffer, "password")).toThrow(
      InvalidP12StructureError
    );
  });

  it("should throw InvalidP12PasswordError if password is invalid", () => {
    (forge.asn1.fromDer as jest.Mock).mockReturnValue("fake-asn1");
    (forge.pkcs12.pkcs12FromAsn1 as jest.Mock).mockImplementation(() => {
      throw new Error("Bad password");
    });

    expect(() => assertIsValidP12OrThrow(mockBuffer, "wrong-password")).toThrow(
      InvalidP12PasswordError
    );
  });

  it("should not throw if structure and password are correct", () => {
    (forge.asn1.fromDer as jest.Mock).mockReturnValue("ok-asn1");
    (forge.pkcs12.pkcs12FromAsn1 as jest.Mock).mockReturnValue({});

    expect(() =>
      assertIsValidP12OrThrow(mockBuffer, "correct-password")
    ).not.toThrow();
  });
});
