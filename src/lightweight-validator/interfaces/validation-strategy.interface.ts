// validation/strategies/ValidationStrategy.ts

import { FieldRule } from "../types";

export interface ValidationContext {
  key: string;
  value: any;
  rule: FieldRule;
}

export interface ValidationStrategy {
  validate(context: ValidationContext): string[];
}
