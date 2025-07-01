import { DOMParser } from "@xmldom/xmldom";
import { XmlDomContext } from "../../infrastructure/xml-dom-context/xml-dom.context";
import { XmlSignatureInjector } from "../../infrastructure/XmlSignatureInjector";

describe("XmlSignatureInjector", () => {
  const xmlOriginal = `<Factura><infoTributaria><claveAcceso>123</claveAcceso></infoTributaria></Factura>`;
  const xmlFirma = `<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo /></ds:Signature>`;

  let context: XmlDomContext;

  beforeEach(() => {
    context = new XmlDomContext(xmlOriginal);
  });

  it("debería insertar el nodo Signature dentro del XML original", () => {
    const injector = new XmlSignatureInjector(context);

    const result = injector.insertSignature(xmlFirma);

    const doc = new DOMParser().parseFromString(result, "text/xml");
    const signatureNode = doc.getElementsByTagName("ds:Signature")[0];

    expect(signatureNode).toBeDefined();
    expect(result).toContain("<ds:Signature");
    expect(result).toContain("<Factura>");
    expect(result).toContain("</Factura>");
  });

  it("debería mantener el contenido original más la firma", () => {
    const injector = new XmlSignatureInjector(context);
    const result = injector.insertSignature(xmlFirma);

    expect(result).toMatch(
      /<Factura>.*<ds:Signature[\s\S]*<\/ds:Signature>.*<\/Factura>/
    );
  });
});
