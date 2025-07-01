// validation/validation.utils.ts
import { typeValidators } from "../consts";
import { getValidationRules } from "../decorators";
import { Constructor } from "../types";

export function isPlainObject(obj: any): boolean {
  return obj && typeof obj === "object" && obj.constructor === Object;
}

export function toDecorated<T>(ctor: Constructor<T>, raw: any): T {
  if (raw === null || raw === undefined) return raw;
  return raw instanceof ctor ? raw : Object.assign(new ctor(), raw);
}

export function validateObject(instance: any, path = ""): string[] {
  const errors: string[] = [];

  if (
    instance === null ||
    instance === undefined ||
    typeof instance !== "object"
  ) {
    return errors;
  }

  const rules = getValidationRules(instance);
  if (!rules || Object.keys(rules).length === 0) return errors;

  for (const key in rules) {
    if (!Object.hasOwnProperty.call(rules, key)) continue;

    const fullPath = path ? `${path}.${key}` : key;
    const rule = rules[key];
    let value = instance[key];

    const cleaned = typeof value === "string" ? value.trim() : value;

    if (
      rule.required &&
      (cleaned === undefined || cleaned === null || cleaned === "")
    ) {
      errors.push(`El campo "${fullPath}" es obligatorio.`);
      continue;
    }

    if (!rule.required && (value === undefined || value === null)) {
      continue;
    }

    const strategy = typeValidators[rule.type || ""];
    if (strategy) {
      errors.push(...strategy.validate({ key: fullPath, value, rule }));
      continue;
    }

    // Validaciones especiales para object y array
    switch (rule.type) {
      case "object":
        if (value === null) {
          errors.push(`El campo "${fullPath}" debe ser un objeto.`);
        } else if (rule.nestedType) {
          try {
            const nestedInstance = toDecorated(rule.nestedType(), value);
            errors.push(...validateObject(nestedInstance, fullPath));
          } catch (e) {
            errors.push(`Error en campo "${fullPath}": ${e.message}`);
          }
        }
        break;

      case "array":
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(`El campo "${fullPath}" debe ser un arreglo con datos.`);
        } else if (rule.arrayItemType) {
          value.forEach((item, index) => {
            const itemPath = `${fullPath}[${index}]`;
            if (item === null || item === undefined) {
              errors.push(`Elemento ${itemPath} no puede ser nulo`);
            } else {
              try {
                const itemInstance = toDecorated(rule.arrayItemType!(), item);
                errors.push(...validateObject(itemInstance, itemPath));
              } catch (e) {
                errors.push(`Error en elemento ${itemPath}: ${e.message}`);
              }
            }
          });
        }
        break;
    }
  }

  return errors;
}
