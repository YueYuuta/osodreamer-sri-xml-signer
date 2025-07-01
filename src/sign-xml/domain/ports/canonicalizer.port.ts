export interface CanonicalizerPort {
  canonicalize(xml: string): Promise<string>;
}
