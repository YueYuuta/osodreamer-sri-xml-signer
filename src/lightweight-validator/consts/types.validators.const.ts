import { ValidationStrategy } from "../interfaces";

import {
  DateValidationStrategy,
  BooleanValidationStrategy,
  EnumValidationStrategy,
  NumberValidationStrategy,
  StringValidationStrategy,
} from "../strategies";

export const typeValidators: Record<string, ValidationStrategy> = {
  string: new StringValidationStrategy(),
  number: new NumberValidationStrategy(),
  boolean: new BooleanValidationStrategy(),
  enum: new EnumValidationStrategy(),
  date: new DateValidationStrategy(),
};
