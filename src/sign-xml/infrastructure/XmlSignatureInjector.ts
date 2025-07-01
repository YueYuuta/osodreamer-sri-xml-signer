import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import { XmlDomContext } from "./xml-dom-context/xml-dom.context";

export class XmlSignatureInjector {
  constructor(private readonly context: XmlDomContext) {}
  insertSignature(signatureXml: string): string {
    const parser = new DOMParser();
    const serializer = new XMLSerializer();

    const doc = this.context.getDocument();
    const signatureNode = parser.parseFromString(
      signatureXml,
      "application/xml"
    ).documentElement;
    const imported = doc.importNode(signatureNode, true);

    doc.documentElement.appendChild(imported);

    return serializer.serializeToString(doc);
  }
}
