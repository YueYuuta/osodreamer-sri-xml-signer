import { ENV_ENUM } from "../../enums";
import {
  p_calcular_digito_modulo11,
  p_obtener_codigo_autorizacion,
  pad,
} from "../../invoice/utils";

// Mock de los formatos (basado en la imagen)
jest.mock("../../../utils", () => ({
  formatDDMM: (date: Date) => "0107",
  formatDDMMYYYY: (date: Date) => "01072025",
}));

// Mock de documentTypeCodes (por si no existe)
jest.mock("../../const", () => ({
  documentTypeCodes: {
    factura: "01",
  },
}));

describe("pad", () => {
  it("debe rellenar con ceros por defecto", () => {
    expect(pad("9", 3)).toBe("009");
  });

  it("debe rellenar con carácter personalizado", () => {
    expect(pad("A", 4, "X")).toBe("XXXA");
  });

  it("no cambia si ya tiene el ancho", () => {
    expect(pad("123", 3)).toBe("123");
  });
});

describe("p_calcular_digito_modulo11", () => {
  it("devuelve el dígito correcto para una cadena válida", () => {
    const digito = p_calcular_digito_modulo11(
      "01072025011234567890001100000012301071"
    );
    expect(digito).toBeGreaterThanOrEqual(0);
  });

  it("devuelve -1 para una cadena no numérica", () => {
    expect(p_calcular_digito_modulo11("ABCD1234")).toBe(-1);
  });
});

describe("p_obtener_codigo_autorizacion", () => {
  it("genera un código de autorización válido con valores por defecto", () => {
    const result = p_obtener_codigo_autorizacion(
      new Date("2025-07-01"),
      undefined, // tipoComprobante
      undefined, // ruc
      undefined, // ambiente
      undefined, // estab
      undefined, // ptoEmi
      "123"
    );

    expect(result).toMatch(/^\d{49}$/);
  });

  it("utiliza el tipo de comprobante 'factura' por defecto", () => {
    const result = p_obtener_codigo_autorizacion(
      new Date("2025-07-01"),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "123"
    );
    expect(result.startsWith("01072025")).toBe(true);
  });

  it("devuelve el mismo código si se proporciona 'codigo'", () => {
    const customCode = "12345678";
    const result = p_obtener_codigo_autorizacion(
      new Date("2025-07-01"),
      "factura",
      "1234567890001",
      ENV_ENUM.TEST,
      1,
      1,
      "123",
      customCode
    );
    // posición esperada del código = entre índice 39 y 47
    expect(result.slice(39, 47)).toBe(customCode);
  });

  it("lanza error si no se pasa el secuencial", () => {
    expect(() =>
      p_obtener_codigo_autorizacion(
        new Date("2025-07-01"),
        "factura",
        "1234567890001",
        ENV_ENUM.TEST,
        1,
        1,
        "" // secuencial faltante
      )
    ).toThrow("El secuencial es obligatorio");
  });
});
