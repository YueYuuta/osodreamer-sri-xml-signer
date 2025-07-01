import { SignatureIdGeneratorImplement } from "../../../infrastructure/signature-generation/signature-id-generator.implement";

describe("SignatureIdGeneratorImplement", () => {
  let service: SignatureIdGeneratorImplement;

  beforeEach(() => {
    service = new SignatureIdGeneratorImplement();
  });

  it("should generate all required signature identifiers", () => {
    const ids = service.generateAll();

    expect(ids).toHaveProperty("certificateNumber");
    expect(ids).toHaveProperty("signatureNumber");
    expect(ids).toHaveProperty("signedPropertiesNumber");
    expect(ids).toHaveProperty("signedInfoNumber");
    expect(ids).toHaveProperty("signedPropertiesIdNumber");
    expect(ids).toHaveProperty("referenceIdNumber");
    expect(ids).toHaveProperty("signatureValueNumber");
    expect(ids).toHaveProperty("ObjectNumber");

    Object.values(ids).forEach((value) => {
      expect(typeof value).toBe("string");
      expect(/^\d{6,8}$/.test(value)).toBe(true); // entre 6 y 8 cifras
    });
  });

  it("should generate a valid random number as string", () => {
    const random = service.p_obtener_aleatorio();
    expect(typeof random).toBe("string");
    const number = parseInt(random, 10);
    expect(number).toBeGreaterThanOrEqual(100000);
    expect(number).toBeLessThanOrEqual(9999999);
  });
});
