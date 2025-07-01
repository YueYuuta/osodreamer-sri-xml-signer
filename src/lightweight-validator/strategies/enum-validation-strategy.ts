import { ValidationContext, ValidationStrategy } from "../interfaces";

export class EnumValidationStrategy implements ValidationStrategy {
  validate({ key, value, rule }: ValidationContext): string[] {
    const errors: string[] = [];

    const enumObj = rule.enum;
    if (!enumObj) return errors;

    // 🔥 obtener solo valores reales (no claves inversas)
    const allowedValues = Object.entries(enumObj)
      .filter(
        ([enumKey, enumVal]) =>
          typeof enumVal !== "string" || isNaN(Number(enumKey))
      )
      .map(([, val]) => val);

    if (!allowedValues.includes(value)) {
      const receivedType = typeof value;
      const receivedValue = JSON.stringify(value);

      const formattedAllowed = allowedValues
        .map((v) => `${JSON.stringify(v)} (${typeof v})`)
        .join(", ");

      errors.push(
        rule.message ||
          `Valor inválido para "${key}". Recibido: ${receivedValue} (${receivedType}). Permitidos: ${formattedAllowed}.`
      );
    }

    return errors;
  }
}
