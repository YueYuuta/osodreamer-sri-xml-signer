import { utf8Encode, utf8Decode } from "./utf8.util"; // ajusta al path real

describe("utf8Encode / utf8Decode", () => {
  it("should encode and decode a simple string", () => {
    const input = "Hola mundo!";
    const encoded = utf8Encode(input);
    const decoded = utf8Decode(encoded);

    expect(decoded).toBe(input);
  });

  it("should support special characters", () => {
    const input = "¡¿Ñandú ünicörn 🚀!";
    const encoded = utf8Encode(input);
    const decoded = utf8Decode(encoded);

    expect(decoded).toBe(input);
  });

  it("should throw on null or undefined encode", () => {
    expect(() => utf8Encode(null as any)).toThrow(TypeError);
    expect(() => utf8Encode(undefined as any)).toThrow(TypeError);
  });

  it("should throw on null or undefined decode", () => {
    expect(() => utf8Decode(null as any)).toThrow(TypeError);
    expect(() => utf8Decode(undefined as any)).toThrow(TypeError);
  });
});
