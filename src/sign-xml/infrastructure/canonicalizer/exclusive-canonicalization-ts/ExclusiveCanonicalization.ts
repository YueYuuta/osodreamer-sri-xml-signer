// exclusive-canonicalisation.ts
import { Algorithm, CanonicalizationOptions } from "./Algorithm";
import { escapeAttributeEntities, escapeTextEntities } from "./escape";
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const PROCESSING_INSTRUCTION_NODE = 7;
const COMMENT_NODE = 8;
export interface Namespace {
  prefix: string;
  namespaceURI: string;
}

export class ExclusiveCanonicalisation extends Algorithm {
  private includeComments: boolean;
  private inclusiveNamespaces: string[];

  constructor(options: CanonicalizationOptions = {}) {
    super(options);
    this.includeComments = !!options.includeComments;
    this.inclusiveNamespaces = options.inclusiveNamespaces || [];
  }

  name(): string {
    return (
      "http://www.w3.org/2001/10/xml-exc-c14n#" +
      (this.includeComments ? "WithComments" : "")
    );
  }

  getIncludeComments(): boolean {
    return this.includeComments;
  }

  setIncludeComments(include: boolean): void {
    this.includeComments = !!include;
  }

  getInclusiveNamespaces(): string[] {
    return [...this.inclusiveNamespaces];
  }

  setInclusiveNamespaces(namespaces: string[]): this {
    this.inclusiveNamespaces = [...namespaces];
    return this;
  }

  addInclusiveNamespace(ns: string): this {
    this.inclusiveNamespaces.push(ns);
    return this;
  }

  async canonicalise(node: Node): Promise<string> {
    return this._processInner(node);
  }

  private _compareAttributes(a: Attr, b: Attr): number {
    if (!a.prefix && b.prefix) return -1;
    if (!b.prefix && a.prefix) return 1;
    return a.name.localeCompare(b.name);
  }

  private _compareNamespaces(a: Namespace, b: Namespace): number {
    const attr1 = a.prefix + a.namespaceURI;
    const attr2 = b.prefix + b.namespaceURI;
    return attr1.localeCompare(attr2);
  }

  private _renderAttributes(node: Element): string {
    return Array.from(node.attributes || [])
      .filter((attr) => !attr.name.startsWith("xmlns"))
      .sort(this._compareAttributes)
      .map((attr) => ` ${attr.name}="${escapeAttributeEntities(attr.value)}"`)
      .join("");
  }

  private _renderNamespace(
    node: Element,
    prefixesInScope: Namespace[],
    defaultNamespace: string
  ): {
    rendered: string;
    newPrefixesInScope: Namespace[];
    newDefaultNamespace: string;
  } {
    let res = "";
    let newDefaultNamespace = defaultNamespace;
    const newPrefixesInScope = [...prefixesInScope];
    const nsListToRender: Namespace[] = [];

    const currentNamespace = node.namespaceURI || "";

    if (node.prefix) {
      const existing = newPrefixesInScope.find((e) => e.prefix === node.prefix);
      if (!existing || existing.namespaceURI !== node.namespaceURI) {
        newPrefixesInScope.filter((e) => e.prefix !== node.prefix);
        nsListToRender.push({
          prefix: node.prefix,
          namespaceURI: node.namespaceURI!,
        });
        newPrefixesInScope.push({
          prefix: node.prefix,
          namespaceURI: node.namespaceURI!,
        });
      }
    } else if (defaultNamespace !== currentNamespace) {
      newDefaultNamespace = currentNamespace;
      res += ` xmlns="${escapeAttributeEntities(newDefaultNamespace)}"`;
    }

    for (const attr of Array.from(node.attributes || [])) {
      if (attr.prefix && attr.prefix !== "xmlns") {
        const existing = newPrefixesInScope.find(
          (e) => e.prefix === attr.prefix
        );
        if (!existing || existing.namespaceURI !== attr.namespaceURI) {
          newPrefixesInScope.filter((e) => e.prefix !== attr.prefix);
          nsListToRender.push({
            prefix: attr.prefix,
            namespaceURI: attr.namespaceURI!,
          });
          newPrefixesInScope.push({
            prefix: attr.prefix,
            namespaceURI: attr.namespaceURI!,
          });
        }
      } else if (
        attr.prefix === "xmlns" &&
        this.inclusiveNamespaces.includes(attr.localName)
      ) {
        nsListToRender.push({
          prefix: attr.localName,
          namespaceURI: attr.nodeValue!,
        });
      }
    }

    nsListToRender.sort(this._compareNamespaces);
    for (const ns of nsListToRender) {
      res += ` xmlns:${ns.prefix}="${escapeAttributeEntities(ns.namespaceURI)}"`;
    }

    return { rendered: res, newPrefixesInScope, newDefaultNamespace };
  }

  private _renderComment(node: Comment): string {
    return `<!--${escapeTextEntities(node.data)}-->`;
  }

  private _renderProcessingInstruction(node: ProcessingInstruction): string {
    return `<?${node.target}${node.data ? " " + escapeTextEntities(node.data) : ""}?>`;
  }

  private _processInner(
    node: Node,
    prefixesInScope: Namespace[] = [],
    defaultNamespace: string = ""
  ): string {
    switch (node.nodeType) {
      case TEXT_NODE:
        return escapeTextEntities((node as Text).data);
      case COMMENT_NODE:
        return this.includeComments ? this._renderComment(node as Comment) : "";
      case PROCESSING_INSTRUCTION_NODE:
        return this._renderProcessingInstruction(node as ProcessingInstruction);
      case ELEMENT_NODE: {
        const el = node as Element;
        const ns = this._renderNamespace(el, prefixesInScope, defaultNamespace);
        const attrs = this._renderAttributes(el);
        const children = Array.from(el.childNodes)
          .map((child) =>
            this._processInner(
              child,
              ns.newPrefixesInScope,
              ns.newDefaultNamespace
            )
          )
          .join("");
        return `<${el.tagName}${ns.rendered}${attrs}>${children}</${el.tagName}>`;
      }
      default:
        return "";
    }
  }
}
