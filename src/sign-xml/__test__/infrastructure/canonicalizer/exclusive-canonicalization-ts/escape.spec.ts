import {
  escapeAttributeEntities,
  escapeTextEntities,
} from "../../../../infrastructure/canonicalizer/exclusive-canonicalization-ts/escape";

describe("XML Entity Escaping", () => {
  describe("escapeAttributeEntities", () => {
    it("should escape all attribute-related characters", () => {
      const input = `"\t\n\r<&`;
      const expected = "&quot;&#x9;&#xA;&#xD;&lt;&amp;";
      expect(escapeAttributeEntities(input)).toBe(expected);
    });

    it("should not modify safe characters", () => {
      const input = "abcXYZ123";
      expect(escapeAttributeEntities(input)).toBe(input);
    });
  });

  describe("escapeTextEntities", () => {
    it("should escape all text-related characters", () => {
      const input = "<>&\r";
      const expected = "&lt;&gt;&amp;&#xD;";
      expect(escapeTextEntities(input)).toBe(expected);
    });

    it("should not modify safe text", () => {
      const input = "texto plano sin caracteres especiales";
      expect(escapeTextEntities(input)).toBe(input);
    });
  });
});
