import { CanonicalizerPort } from "../../domain/ports";
import { ExclusiveCanonicalisation } from "./exclusive-canonicalization-ts/ExclusiveCanonicalization";
import { XmlDomContext } from "../xml-dom-context/xml-dom.context";

export class CanonicalizerImplement implements CanonicalizerPort {
  constructor(private readonly context: XmlDomContext) {}
  async canonicalize(): Promise<string> {
    const targetNode = this.context.getRootNode();

    const canonicalizer = new ExclusiveCanonicalisation({
      includeComments: false,
      inclusiveNamespaces: [],
    });

    return await canonicalizer.canonicalise(targetNode as unknown as Node);
  }
}
