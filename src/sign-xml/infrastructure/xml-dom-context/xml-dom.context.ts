import { DOMParser } from "@xmldom/xmldom";
import type {
  Document as DocumentDom,
  Element as ElementDom,
} from "@xmldom/xmldom";
import { InvalidXmlStructureError } from "../errors";

export class XmlDomContext {
  private readonly dom: DocumentDom;

  constructor(xmlString: string) {
    try {
      const dom = new DOMParser({
        errorHandler: () => {},
      }).parseFromString(xmlString, "text/xml");

      this.dom = dom;
    } catch (err) {
      throw new InvalidXmlStructureError();
    }
  }

  getDocument(): DocumentDom {
    return this.dom;
  }

  getRootNode(): ElementDom {
    return this.dom.documentElement;
  }
}
