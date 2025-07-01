import { IDENTIFICATION_CODE_ENUM } from "../../enums";
import { ValidationException } from "../../exceptions";
import { GenerateInvoiceXml } from "../../invoice/invoice.generator";

// Mocks
jest.mock("../../invoice/validators/factura-validator", () => ({
  validateFactura: jest.fn().mockReturnValue([]),
}));

jest.mock(
  "../../../lightweight-validator/validations/object.validation",
  () => ({
    toDecorated: jest.fn((_, obj) => obj),
    validateObject: jest.fn().mockReturnValue([]),
  })
);

jest.mock("../../invoice/factory", () => ({
  InvoiceXmlFactory: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue({
      factura: {
        infoTributaria: {
          razonSocial: "Empresa de Prueba",
        },
        infoFactura: {
          fechaEmision: "01/07/2025",
        },
      },
    }),
  })),
}));

jest.mock("./../../invoice/utils", () => ({
  removeNullFields: jest.fn((obj) => obj), // simula limpieza
}));

describe("GenerateInvoiceXml", () => {
  const baseInvoice: any = {
    infoTributaria: {
      ambiente: 1,
      dirMatriz: "Matriz",
      estab: "001",
      ptoEmi: "001",
      razonSocial: "Empresa de Prueba",
      nombreComercial: "Comercial",
      ruc: "1234567890001",
      secuencial: "000000123",
      codDoc: "01",
      tipoEmision: 1,
    },
    infoFactura: {
      fechaEmision: new Date("2025-07-01"),
      dirEstablecimiento: "Sucursal",
      tipoIdentificacionComprador: IDENTIFICATION_CODE_ENUM.CEDULA,
      razonSocialComprador: "Cliente Prueba",
      identificacionComprador: "0999999999",
      totalSinImpuestos: 100,
      totalConImpuestos: { totalImpuesto: [] },
      importeTotal: 112,
      moneda: "DOLAR",
    },
    detalles: { detalle: [] },
  };

  it("debe generar un XML correctamente si no hay errores", async () => {
    const result = await GenerateInvoiceXml(baseInvoice as any);

    expect(result).toHaveProperty("generatedXml");
    expect(result).toHaveProperty("invoiceJson");
    expect(typeof result.generatedXml).toBe("string");
    expect(result.invoiceJson).toHaveProperty("factura");
    expect(result.invoiceJson.factura.infoTributaria.razonSocial).toBe(
      "Empresa de Prueba"
    );
  });

  it("debe lanzar ValidationException si hay errores de validación", async () => {
    const {
      validateObject,
    } = require("../../../lightweight-validator/validations/object.validation");
    validateObject.mockReturnValueOnce(["campo requerido"]);

    await expect(GenerateInvoiceXml(baseInvoice)).rejects.toThrow(
      ValidationException
    );
  });
});
