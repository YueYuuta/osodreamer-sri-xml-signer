import { uint8ArrayToBase64, normalizeSelfClosingTags } from "./xml.util"; // ajusta la ruta real

describe("uint8ArrayToBase64", () => {
  it("should convert Uint8Array to base64", () => {
    const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
    const result = uint8ArrayToBase64(bytes);
    expect(result).toBe("SGVsbG8=");
  });
});

describe("normalizeSelfClosingTags", () => {
  it("should normalize a single self-closing tag", () => {
    const input = `<item id="1"/>`;
    const result = normalizeSelfClosingTags(input);
    expect(result).toBe(`<item id="1"></item>`);
  });

  it("should normalize multiple self-closing tags", () => {
    const input = `<a/><b attr="x"/><c></c>`;
    const result = normalizeSelfClosingTags(input);
    expect(result).toBe(`<a></a><b attr="x"></b><c></c>`);
  });

  it("should do nothing if there are no self-closing tags", () => {
    const input = `<root><child></child></root>`;
    const result = normalizeSelfClosingTags(input);
    expect(result).toBe(input);
  });
});
