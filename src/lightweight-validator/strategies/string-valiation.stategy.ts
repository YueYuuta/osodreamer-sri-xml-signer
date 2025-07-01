// StringValidationStrategy.ts

import { ValidationContext, ValidationStrategy } from "../interfaces";

export class StringValidationStrategy implements ValidationStrategy {
  validate({ key, value, rule }: ValidationContext): string[] {
    const errors: string[] = [];

    if (typeof value !== "string") {
      errors.push(`El campo "${key}" debe ser un string.`);
      return errors;
    }

    if (rule.numericOnly && !/^\d+$/.test(value)) {
      errors.push(
        rule.message ||
          `El campo "${key}" solo debe contener números (sin letras ni símbolos).`
      );
      return errors;
    }

    const length = value.length;

    if (rule.exactLength !== undefined && length !== rule.exactLength) {
      errors.push(
        rule.exactLengthMessage ||
          `El campo "${key}" debe tener exactamente ${rule.exactLength} caracteres.`
      );
    }

    if (rule.minLength !== undefined && length < rule.minLength) {
      errors.push(
        rule.minLengthMessage ||
          `El campo "${key}" debe tener al menos ${rule.minLength} caracteres.`
      );
    }

    if (rule.maxLength !== undefined && length > rule.maxLength) {
      errors.push(
        rule.maxLengthMessage ||
          `El campo "${key}" no puede tener más de ${rule.maxLength} caracteres.`
      );
    }

    return errors;
  }
}
