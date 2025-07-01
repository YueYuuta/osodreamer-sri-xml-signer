import {
  formatDDMMYYYY,
  formatDDMM,
  formatDateTimeEcuador,
} from "./date-utils";

describe("formatDDMMYYYY", () => {
  it("should format date as DDMMYYYY", () => {
    const date = new Date(2025, 5, 28); // 28 de junio de 2025
    expect(formatDDMMYYYY(date)).toBe("28062025");
  });
});

describe("formatDDMM", () => {
  it("should format date as DDMM", () => {
    const date = new Date(2025, 11, 9); // 9 de diciembre
    expect(formatDDMM(date)).toBe("0912");
  });
});

describe("formatDateTimeEcuador", () => {
  it("should format a date in Ecuador time with -05:00 offset", () => {
    const inputDate = new Date(Date.UTC(2025, 0, 2, 15, 4, 5));
    const result = formatDateTimeEcuador(inputDate);
    expect(result).toBe("2025-01-02T10:04:05-05:00");
  });

  it("should not adjust if timezone offset is already -300", () => {
    const original = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = jest.fn(() => -300);

    const result = formatDateTimeEcuador(new Date(2025, 0, 1, 8, 30, 0));
    expect(result.endsWith("-05:00")).toBe(true);

    Date.prototype.getTimezoneOffset = original;
  });

  it("should use current date if no parameter is provided", () => {
    const result = formatDateTimeEcuador();
    expect(result).toMatch(/T\d{2}:\d{2}:\d{2}-05:00$/);
  });
});
