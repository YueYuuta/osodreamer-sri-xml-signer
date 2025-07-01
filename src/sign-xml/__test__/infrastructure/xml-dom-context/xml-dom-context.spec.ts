import { DOMParser } from "@xmldom/xmldom";
import { XmlDomContext } from "../../../infrastructure/xml-dom-context/xml-dom.context";
import { InvalidXmlStructureError } from "../../../infrastructure/errors";

describe("XmlDomContext", () => {
  const validXml = `<root><child>Hola</child></root>`;
  const invalidXml = `<root><child></root>`; // mal cerrado

  it("debería parsear correctamente un XML válido", () => {
    const context = new XmlDomContext(validXml);
    const doc = context.getDocument();
    const root = context.getRootNode();

    expect(doc).toBeDefined();
    expect(root.nodeName).toBe("root");
  });

  it("debería lanzar InvalidXmlStructureError si el XML es inválido", () => {
    expect(() => new XmlDomContext(invalidXml)).toThrow(
      InvalidXmlStructureError
    );
  });

  it("getDocument debería retornar el documento completo", () => {
    const context = new XmlDomContext(validXml);
    const document = context.getDocument();
    expect(document.nodeType).toBe(9); // DOCUMENT_NODE
  });

  it("getRootNode debería retornar el nodo raíz", () => {
    const context = new XmlDomContext(validXml);
    const root = context.getRootNode();
    expect(root.nodeName).toBe("root");
    expect(root.childNodes.length).toBeGreaterThan(0);
  });
});
