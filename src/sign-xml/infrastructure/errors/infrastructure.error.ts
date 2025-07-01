export class InfrastructureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InfrastructureError";
  }
}

export class UnknownSignStrategyError extends InfrastructureError {
  constructor(friendlyName: string) {
    super(`No existe estrategia para el certificado: ${friendlyName}`);
    this.name = "UnknownSignStrategyError";
  }
}

export class SignStrategyError extends InfrastructureError {
  constructor(message: string) {
    super(message);
    this.name = "SignStrategyError";
  }
}

export class SigningKeyNotFoundError extends SignStrategyError {
  constructor(friendlyName: string) {
    super(
      `No se encontró la clave de firma para el certificado: ${friendlyName}`
    );
    this.name = "SigningKeyNotFoundError";
  }
}
export class PrivateKeyExtractionError extends SignStrategyError {
  constructor(sourceLabel = "archivo P12") {
    super(`No se pudo extraer la clave privada desde ${sourceLabel}.`);
    this.name = "PrivateKeyExtractionError";
  }
}
export class UanatacaCertificateNotFoundError extends SignStrategyError {
  constructor() {
    super("No se encontró el certificado para UANATACA.");
    this.name = "UanatacaCertificateNotFoundError";
  }
}

export class InvalidP12StructureError extends Error {
  constructor() {
    super("El archivo no es un archivo PKCS#12 (P12) válido.");
    this.name = "InvalidP12StructureError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidP12PasswordError extends Error {
  constructor() {
    super("El archivo P12 es válido, pero la contraseña es incorrecta.");
    this.name = "InvalidP12PasswordError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// errors/InvalidXmlStructureError.ts
export class InvalidXmlStructureError extends Error {
  constructor(message = "El archivo proporcionado no es un XML válido.") {
    super(message);
    this.name = "InvalidXmlStructureError";
    Object.setPrototypeOf(this, new.target.prototype); // muy importante para instanceof
  }
}
