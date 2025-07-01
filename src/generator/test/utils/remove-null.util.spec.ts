import { removeNullFields } from "../../invoice/utils";

interface InvoiceSriBuilder {
  [key: string]: any;
}

describe("removeNullFields", () => {
  it("should remove null, undefined and empty string values", () => {
    const input: InvoiceSriBuilder = {
      name: "Empresa",
      ruc: null,
      dirMatriz: undefined,
      phone: "",
      email: "test@example.com",
    };

    const result = removeNullFields(input as any);

    expect(result).toEqual({
      name: "Empresa",
      email: "test@example.com",
    });
  });

  it("should remove empty nested objects", () => {
    const input: InvoiceSriBuilder = {
      name: "Empresa",
      infoTributaria: {},
    };

    const result = removeNullFields(input as any);

    expect(result).toEqual({
      name: "Empresa",
    });
  });

  it("should recurse into nested objects and remove nulls", () => {
    const input: InvoiceSriBuilder = {
      infoTributaria: {
        ruc: "1234567890001",
        dirMatriz: "",
        contribuyenteEspecial: null,
      },
      infoFactura: {
        total: 100,
        detalles: {
          producto: "",
          cantidad: 2,
        },
      },
    };

    const result = removeNullFields(input as any);

    expect(result).toEqual({
      infoTributaria: {
        ruc: "1234567890001",
      },
      infoFactura: {
        total: 100,
        detalles: {
          cantidad: 2,
        },
      },
    });
  });

  it("should handle completely empty object", () => {
    const input: InvoiceSriBuilder = {};
    const result = removeNullFields(input as any);
    expect(result).toEqual({});
  });

  it("should not remove non-empty arrays or objects with values", () => {
    const input: InvoiceSriBuilder = {
      detalles: [],
      impuestos: [{ tipo: "IVA", valor: 12 }],
    };

    const result = removeNullFields(input as any);
    expect(result).toEqual({
      impuestos: [{ tipo: "IVA", valor: 12 }],
    });
  });
});
