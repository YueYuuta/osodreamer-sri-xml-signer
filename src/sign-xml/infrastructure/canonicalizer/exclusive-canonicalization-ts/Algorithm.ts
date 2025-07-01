// algorithm.ts

export interface CanonicalizationOptions {
  // Puedes definir aquí las opciones necesarias
}

export class Algorithm {
  constructor(private options?: CanonicalizationOptions) {
    // Inicializa con opciones si es necesario
  }

  name(): string | null {
    return null; // Devuelve el nombre del algoritmo si aplica
  }

  /**
   * Canonicaliza un nodo XML.
   * @param node Nodo XML a procesar.
   * @returns Una promesa que se resuelve con el resultado canonicalizado.
   */
  async canonicalise(node: Node): Promise<string> {
    // Simula una operación asincrónica no implementada
    throw new Error("not implemented");
  }
}
// algorithm.ts (o donde definas CanonicalizationOptions)

export interface CanonicalizationOptions {
  includeComments?: boolean;
  inclusiveNamespaces?: string[];
}
