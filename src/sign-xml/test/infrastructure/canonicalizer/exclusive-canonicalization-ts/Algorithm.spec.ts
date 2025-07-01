import { DOMParser } from "@xmldom/xmldom";
import { Algorithm } from "../../../../infrastructure/canonicalizer/exclusive-canonicalization-ts/Algorithm";

describe("Algorithm", () => {
  it("should return null from name()", () => {
    const algo = new Algorithm();
    expect(algo.name()).toBeNull();
  });

  it("should throw 'not implemented' when canonicalise is called", async () => {
    const xml = `<root><child>Text</child></root>`;
    const node = new DOMParser().parseFromString(
      xml,
      "text/xml"
    ).documentElement;

    const algo = new Algorithm();

    await expect(algo.canonicalise(node as unknown as Node)).rejects.toThrow(
      "not implemented"
    );
  });
});
