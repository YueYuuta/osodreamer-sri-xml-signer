// validation/strategies/BooleanValidationStrategy.ts

import { ValidationContext, ValidationStrategy } from "../interfaces";

export class BooleanValidationStrategy implements ValidationStrategy {
  validate({ key, value }: ValidationContext): string[] {
    const errors: string[] = [];

    if (typeof value !== "boolean") {
      errors.push(`El campo "${key}" debe ser un boolean.`);
    }

    return errors;
  }
}
