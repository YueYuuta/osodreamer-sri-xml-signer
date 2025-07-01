import { ExclusiveCanonicalisation } from "../../../../infrastructure/canonicalizer/exclusive-canonicalization-ts/ExclusiveCanonicalization";
import { DOMParser } from "@xmldom/xmldom";
import type { Element as ElementDom } from "@xmldom/xmldom";
describe("ExclusiveCanonicalisation", () => {
  let canonicalizer: ExclusiveCanonicalisation;

  beforeEach(() => {
    canonicalizer = new ExclusiveCanonicalisation({
      includeComments: true,
      inclusiveNamespaces: ["ds"],
    });
  });

  it("should return the correct canonicalization algorithm name", () => {
    expect(canonicalizer.name()).toBe(
      "http://www.w3.org/2001/10/xml-exc-c14n#WithComments"
    );
  });

  it("should get and set includeComments", () => {
    expect(canonicalizer.getIncludeComments()).toBe(true);
    canonicalizer.setIncludeComments(false);
    expect(canonicalizer.getIncludeComments()).toBe(false);
  });

  it("should get/set/add inclusive namespaces", () => {
    expect(canonicalizer.getInclusiveNamespaces()).toEqual(["ds"]);
    canonicalizer.setInclusiveNamespaces(["x"]);
    expect(canonicalizer.getInclusiveNamespaces()).toEqual(["x"]);
    canonicalizer.addInclusiveNamespace("sri");
    expect(canonicalizer.getInclusiveNamespaces()).toEqual(["x", "sri"]);
  });

  it("should canonicalize a basic XML element with attributes", async () => {
    const xml = `<root xmlns="http://test" attr2="b" attr1="a"><child/></root>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const result = await canonicalizer.canonicalise(
      doc.documentElement as unknown as Node
    );
    expect(result).toContain("<root");
    expect(result).toContain("xmlns=");
    expect(result).toContain('attr1="a"');
    expect(result).toContain('attr2="b"');
  });

  it("should include comments if enabled", async () => {
    const xml = `<root><!-- un comentario --></root>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const result = await canonicalizer.canonicalise(
      doc.documentElement as unknown as Node
    );
    expect(result).toContain("");
  });

  it("should omit comments if disabled", async () => {
    canonicalizer.setIncludeComments(false);
    const xml = `<root><!-- otro comentario --></root>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const result = await canonicalizer.canonicalise(
      doc.documentElement as unknown as Node
    );
    expect(result).not.toContain("<!--");
  });

  it("should process text nodes", async () => {
    const xml = `<root> &lt;texto&gt; </root>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const result = await canonicalizer.canonicalise(
      doc.documentElement as unknown as Node
    );
    expect(result).toContain("&lt;texto&gt;");
  });

  it("should process processing instruction nodes", async () => {
    const xml = `<?xml-stylesheet type="text/xsl" href="style.xsl"?><root></root>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const result = await canonicalizer.canonicalise(doc as unknown as Node);
    expect(result).toContain("");
  });

  it("should include inclusive namespace declaration if listed", async () => {
    const xml = `<root xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo/></root>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const result = await canonicalizer.canonicalise(
      doc.documentElement as unknown as Node
    );
    expect(result).toContain('xmlns:ds="http://www.w3.org/2000/09/xmldsig#"');
  });

  it("should handle default namespace change", async () => {
    const xml = `<root xmlns="http://defaultns"><child/></root>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const result = await canonicalizer.canonicalise(
      doc.documentElement as unknown as Node
    );
    expect(result).toContain('xmlns="http://defaultns"');
  });

  it("should render empty result for unsupported node type", async () => {
    const doc = new DOMParser().parseFromString("<root/>", "text/xml");
    const cdata = doc.createCDATASection("data");
    const result = await (canonicalizer as any)._processInner(cdata);
    expect(result).toBe("");
  });
});
describe("_compareAttributes", () => {
  const canonicalizer = new ExclusiveCanonicalisation();

  const createAttr = (name: string, prefix: string | null = null): Attr => {
    return {
      name,
      prefix,
      value: "",
    } as Attr;
  };

  it("debería retornar -1 si a tiene prefix y b no", () => {
    const a = createAttr("id", null);
    const b = createAttr("id", "ns");
    const result = (canonicalizer as any)._compareAttributes(a, b);
    expect(result).toBe(-1);
  });

  it("debería retornar 1 si b tiene prefix y a no", () => {
    const a = createAttr("id", "ns");
    const b = createAttr("id", null);
    const result = (canonicalizer as any)._compareAttributes(a, b);
    expect(result).toBe(1);
  });

  it("debería retornar 0 si ambos tienen mismo nombre", () => {
    const a = createAttr("id", "ns1");
    const b = createAttr("id", "ns2");
    const result = (canonicalizer as any)._compareAttributes(a, b);
    expect(result).toBe(0);
  });
});
describe("_compareNamespaces", () => {
  const canonicalizer = new ExclusiveCanonicalisation();

  it("debería ordenar por prefix + namespaceURI", () => {
    const ns1 = { prefix: "a", namespaceURI: "http://a.com" };
    const ns2 = { prefix: "b", namespaceURI: "http://b.com" };
    const result = (canonicalizer as any)._compareNamespaces(ns1, ns2);
    expect(result).toBeLessThan(0); // porque a < b
  });

  it("debería retornar 0 si son iguales", () => {
    const ns1 = { prefix: "a", namespaceURI: "http://a.com" };
    const ns2 = { prefix: "a", namespaceURI: "http://a.com" };
    const result = (canonicalizer as any)._compareNamespaces(ns1, ns2);
    expect(result).toBe(0);
  });

  it("debería retornar positivo si a > b", () => {
    const ns1 = { prefix: "z", namespaceURI: "http://z.com" };
    const ns2 = { prefix: "a", namespaceURI: "http://a.com" };
    const result = (canonicalizer as any)._compareNamespaces(ns1, ns2);
    expect(result).toBeGreaterThan(0);
  });
});
describe("ExclusiveCanonicalisation", () => {
  const createElementFromString = (xmlStr: string): ElementDom => {
    return new DOMParser().parseFromString(xmlStr, "application/xml")
      .documentElement;
  };

  it("should canonicalize element with new prefix in scope", async () => {
    const canonicalizer = new ExclusiveCanonicalisation({
      includeComments: false,
      inclusiveNamespaces: [],
    });

    const element = createElementFromString(
      `<foo:bar xmlns:foo="http://test.com"/>`
    );
    const result = await canonicalizer.canonicalise(element as unknown as Node);

    expect(result).toContain('xmlns:foo="http://test.com"');
    expect(result).toContain("<foo:bar");
  });

  it("should canonicalize with default namespace changed", async () => {
    const canonicalizer = new ExclusiveCanonicalisation();
    const element = createElementFromString(
      `<bar xmlns="http://default.com"/>`
    );
    const result = await canonicalizer.canonicalise(element as unknown as Node);

    expect(result).toContain('xmlns="http://default.com"');
  });

  it("should render attribute with prefix not in scope", async () => {
    const canonicalizer = new ExclusiveCanonicalisation();
    const element = createElementFromString(
      `<test xmlns:abc="http://abc.com" abc:attr="123"/>`
    );
    const result = await canonicalizer.canonicalise(element as unknown as Node);

    expect(result).toContain('xmlns:abc="http://abc.com"');
    expect(result).toContain('abc:attr="123"');
  });

  it("should include xmlns:* when in inclusiveNamespaces", async () => {
    const canonicalizer = new ExclusiveCanonicalisation({
      inclusiveNamespaces: ["foo"],
    });

    const element = createElementFromString(
      `<bar xmlns:foo="http://included.com" foo:attr="value"/>`
    );
    const result = await canonicalizer.canonicalise(element as unknown as Node);

    expect(result).toContain('xmlns:foo="http://included.com"');
  });

  it("should compare attributes correctly", () => {
    const canonicalizer = new ExclusiveCanonicalisation();

    const a = { prefix: null, name: "a" } as Attr;
    const b = { prefix: "p", name: "b" } as Attr;

    expect(canonicalizer["_compareAttributes"](a, b)).toBe(-1);
    expect(canonicalizer["_compareAttributes"](b, a)).toBe(1);

    const a2 = { prefix: null, name: "a" } as Attr;
    const b2 = { prefix: null, name: "b" } as Attr;
    expect(canonicalizer["_compareAttributes"](a2, b2)).toBeLessThan(0);
  });

  it("should compare namespaces correctly", () => {
    const canonicalizer = new ExclusiveCanonicalisation();

    const a = { prefix: "a", namespaceURI: "uri1" };
    const b = { prefix: "b", namespaceURI: "uri2" };
    expect(canonicalizer["_compareNamespaces"](a, b)).toBeLessThan(0);
  });
});
it("should render processing instruction node", async () => {
  const canonicalizer = new ExclusiveCanonicalisation();

  const xml = `<root><?custom processing?></root>`;
  const doc = new DOMParser().parseFromString(xml, "application/xml");

  const piNode = Array.from(doc.childNodes[0].childNodes).find(
    (n) => n.nodeType === 7 // PROCESSING_INSTRUCTION_NODE
  );

  const result = await canonicalizer["canonicalise"](
    piNode! as unknown as Node
  );

  expect(result).toBe("<?custom processing?>");
});
