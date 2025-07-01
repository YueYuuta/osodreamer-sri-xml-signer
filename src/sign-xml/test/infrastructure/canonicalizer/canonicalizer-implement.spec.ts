import { CanonicalizerImplement } from "../../../infrastructure/canonicalizer/canonicalizer.implement";
import { XmlDomContext } from "../../../infrastructure/xml-dom-context/xml-dom.context";

jest.mock(
  "../../../infrastructure/canonicalizer/exclusive-canonicalization-ts/ExclusiveCanonicalization",
  () => {
    const canonicaliseMock = jest.fn().mockResolvedValue("<Canonizado />");
    return {
      ExclusiveCanonicalisation: jest.fn().mockImplementation(() => ({
        canonicalise: canonicaliseMock,
      })),
      __esModule: true,
    };
  }
);

import { ExclusiveCanonicalisation } from "../../../infrastructure/canonicalizer/exclusive-canonicalization-ts/ExclusiveCanonicalization";

describe("CanonicalizerImplement", () => {
  let contextMock: XmlDomContext;

  beforeEach(() => {
    contextMock = {
      getRootNode: jest.fn().mockReturnValue({ nodeName: "Factura" }),
    } as any;
  });

  it("debería retornar el XML canonizado correctamente", async () => {
    const canonicalizer = new CanonicalizerImplement(contextMock);
    const result = await canonicalizer.canonicalize();

    expect(result).toBe("<Canonizado />");
    expect(contextMock.getRootNode).toHaveBeenCalled();

    const instance = (ExclusiveCanonicalisation as jest.Mock).mock.results[0]
      .value;
    expect(instance.canonicalise).toHaveBeenCalled();
  });

  it("debería instanciar el canonicalizador con los parámetros correctos", async () => {
    new CanonicalizerImplement(contextMock).canonicalize();

    expect(ExclusiveCanonicalisation).toHaveBeenCalledWith({
      includeComments: false,
      inclusiveNamespaces: [],
    });
  });
});
