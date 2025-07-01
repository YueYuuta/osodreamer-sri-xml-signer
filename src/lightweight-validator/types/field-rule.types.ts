export type Constructor<T = any> = new (...args: any[]) => T;

export type ClassFieldDecorator<T = any> = (
  target: undefined,
  context: ClassFieldDecoratorContext<T>
) => void;

export interface ClassFieldDecoratorContext<T = any> {
  kind: "field";
  name: string | symbol;
  static: boolean;
  private: boolean;
  addInitializer(initializer: (this: T) => void): void;
}

export type RuleType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "enum";

export interface FieldRule {
  required?: boolean;
  type?: RuleType;
  nestedType?: () => Constructor<any>;
  arrayItemType?: () => Constructor<any>;
  enum?: Record<string | number, string | number>;
  minLength?: number;
  maxLength?: number;
  exactLength?: number;
  message?: string;
  minLengthMessage?: string;
  maxLengthMessage?: string;
  exactLengthMessage?: string;
  numericOnly?: boolean; // 🔥 nuevo campo
  maxDigits?: number;
  maxDigitsMessage?: string;
  digits?: { integer: number; fraction: number };
  digitsMessage?: string;
}
