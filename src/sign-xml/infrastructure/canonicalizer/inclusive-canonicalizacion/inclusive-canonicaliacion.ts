import { DOMParser } from "@xmldom/xmldom";

export interface CanonicalizationOptions {
  includeComments?: boolean;
  includeProcessingInstructions?: boolean;
  nodeSet?: Set<Node>;
}

export class CanonicalXml10 {
  async canonicalize(
    xml: string,
    options?: CanonicalizationOptions
  ): Promise<string> {
    if (/<!DOCTYPE/i.test(xml)) {
      throw new Error("Canonical XML 1.0 forbids DTDs");
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");

    const nodeSet =
      options?.nodeSet ?? this.createFullNodeSet(doc as unknown as Node);
    return this.renderNodes(
      Array.from(doc.childNodes as unknown as Node[]),
      nodeSet,
      options
    );
  }

  private async renderNodes(
    nodes: Node[],
    nodeSet: Set<Node>,
    options?: CanonicalizationOptions
  ): Promise<string> {
    let result = "";
    for (const node of nodes) {
      result += await this.renderNode(node, nodeSet, options);
    }
    return result;
  }

  private async renderNode(
    node: Node,
    nodeSet: Set<Node>,
    options?: CanonicalizationOptions
  ): Promise<string> {
    if (!nodeSet.has(node)) return "";

    switch (node.nodeType) {
      case 1: // ELEMENT_NODE
        return this.renderElement(node as Element, nodeSet, options);
      case 3: // TEXT_NODE
        return node.nodeValue
          ? this.normalizeAndEscapeText(node.nodeValue)
          : "";
      case 4: // CDATA_SECTION_NODE
        return node.nodeValue
          ? this.normalizeAndEscapeText(node.nodeValue)
          : "";
      case 5: // ENTITY_REFERENCE_NODE
        return this.renderNodes(Array.from(node.childNodes), nodeSet, options);
      case 7: // PROCESSING_INSTRUCTION_NODE
        if (options?.includeProcessingInstructions) {
          const pi = node as ProcessingInstruction;
          return pi.data ? `<?${pi.target} ${pi.data}?>` : `<?${pi.target}?>`;
        }
        return "";
      case 8: // COMMENT_NODE
        return options?.includeComments
          ? `<!--${(node as Comment).data}-->`
          : "";
      case 9: // DOCUMENT_NODE
        return this.renderNodes(
          Array.from((node as Document).childNodes),
          nodeSet,
          options
        );
      case 10: // DOCUMENT_TYPE_NODE
        return ""; // Siempre excluido
      default:
        return "";
    }
  }

  private async renderElement(
    elem: Element,
    nodeSet: Set<Node>,
    options?: CanonicalizationOptions
  ): Promise<string> {
    const tagName = elem.tagName;

    // Obtener namespaces visibles (sin redundancias)
    const nsAttrs = this.getVisibleNamespaces(elem);

    // Filtrar atributos (excluir namespaces y atributos predeterminados)
    const normalAttrs = Array.from(elem.attributes).filter(
      (attr) =>
        !attr.name.startsWith("xmlns") &&
        !attr.prefix?.startsWith("xmlns") &&
        attr.specified // Excluir atributos predeterminados de DTD
    );

    // Obtener atributos XML heredados
    const xmlAttrs = this.getInheritedXmlAttrs(elem);

    // Ordenar namespaces
    nsAttrs.sort(
      (a, b) => a.name.localeCompare(b.name) || a.value.localeCompare(b.value)
    );

    // Ordenar atributos
    const allAttrs = [...normalAttrs, ...xmlAttrs];
    allAttrs.sort((a, b) => {
      const nsA = a.namespaceURI || "";
      const nsB = b.namespaceURI || "";
      return nsA.localeCompare(nsB) || a.localName.localeCompare(b.localName);
    });

    // Construir apertura de elemento
    let open = `<${tagName}`;

    // Agregar namespaces
    for (const attr of nsAttrs) {
      open += ` ${attr.name}="${this.normalizeAndEscapeAttr(attr.value)}"`;
    }

    // Agregar atributos
    for (const attr of allAttrs) {
      const attrName = attr.prefix
        ? `${attr.prefix}:${attr.localName}`
        : attr.localName;
      open += ` ${attrName}="${this.normalizeAndEscapeAttr(attr.value)}"`;
    }

    // Manejar elementos vacíos correctamente
    const hasChildren = elem.childNodes.length > 0;
    open += hasChildren ? ">" : "/>";

    // Procesar hijos si existen
    if (hasChildren) {
      const children = await this.renderNodes(
        Array.from(elem.childNodes),
        nodeSet,
        options
      );
      return open + children + `</${tagName}>`;
    }

    return open;
  }

  private createFullNodeSet(node: Node): Set<Node> {
    const set = new Set<Node>();
    const traverse = (n: Node) => {
      set.add(n);
      for (let i = 0; i < n.childNodes.length; i++) {
        traverse(n.childNodes[i]);
      }
    };
    traverse(node);
    return set;
  }

  private normalizeAndEscapeAttr(str: string): string {
    // Normalización Canonical XML
    return str
      .replace(/\r\n?/g, "\n") // Normalizar retornos de carro
      .replace(/[\t\n\r]/g, " ") // Normalizar espacios
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;")
      .normalize("NFC"); // Forma de normalización Unicode
  }

  private normalizeAndEscapeText(str: string): string {
    // Normalización Canonical XML
    return str
      .replace(/\r\n?/g, "\n") // Normalizar retornos de carro
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .normalize("NFC"); // Forma de normalización Unicode
  }

  private getVisibleNamespaces(
    elem: Element
  ): { name: string; value: string }[] {
    // Namespaces activos (prefijo -> URI)
    const activeNamespaces = new Map<string, string>();
    const result: { name: string; value: string }[] = [];

    // Función para agregar namespace si es necesario
    const addNamespace = (prefix: string, uri: string) => {
      const currentUri = activeNamespaces.get(prefix);
      if (currentUri !== uri) {
        activeNamespaces.set(prefix, uri);
        result.push({
          name: prefix ? `xmlns:${prefix}` : "xmlns",
          value: uri,
        });
      }
    };

    // Recorrer ancestros desde la raíz hasta el elemento actual
    const ancestors: Element[] = [];
    let current: Element | null = elem;
    while (current) {
      ancestors.unshift(current);
      current = current.parentElement;
    }

    // Procesar desde la raíz hacia el elemento actual
    for (const ancestor of ancestors) {
      // Recolectar declaraciones en este elemento
      Array.from(ancestor.attributes).forEach((attr) => {
        if (attr.name === "xmlns") {
          addNamespace("", attr.value);
        } else if (attr.prefix === "xmlns") {
          addNamespace(attr.localName, attr.value);
        }
      });
    }

    return result;
  }

  private getInheritedXmlAttrs(elem: Element): Attr[] {
    const xmlAttrs: Map<string, string> = new Map();

    // Buscar desde el elemento actual hacia arriba
    let current: Element | null = elem;
    while (current) {
      for (const attr of Array.from(current.attributes)) {
        const isXmlAttr =
          attr.namespaceURI === "http://www.w3.org/XML/1998/namespace" ||
          attr.name.startsWith("xml:");

        if (isXmlAttr) {
          const localName = attr.localName;
          // Solo agregar si no ha sido definido más cerca
          if (!xmlAttrs.has(localName)) {
            xmlAttrs.set(localName, attr.value);
          }
        }
      }
      current = current.parentElement;
    }

    return Array.from(xmlAttrs).map(([localName, value]) =>
      this.createAttr(
        `xml:${localName}`,
        value,
        "http://www.w3.org/XML/1998/namespace"
      )
    );
  }

  private createAttr(name: string, value: string, namespaceURI: string): Attr {
    return {
      name,
      value,
      namespaceURI,
      localName: name.split(":")[1] || name,
      prefix: name.startsWith("xml:") ? "xml" : null,
    } as Attr;
  }
}
