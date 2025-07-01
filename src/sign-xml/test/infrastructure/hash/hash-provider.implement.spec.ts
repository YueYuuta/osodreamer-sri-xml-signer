import { HashProviderImplement } from "../../../infrastructure/hash/hash-provider.implement";

describe("HashProviderImplement", () => {
  let service: HashProviderImplement;

  beforeEach(() => {
    service = new HashProviderImplement();
  });

  it("should hash string to sha1 and return base64", () => {
    const input = "hola mundo";
    const result = service.sha1Base64(input);

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("should throw if sha1RawBase64 is called", () => {
    expect(() => {
      service.sha1RawBase64(new Uint8Array());
    }).toThrow("Method not implemented.");
  });
});
