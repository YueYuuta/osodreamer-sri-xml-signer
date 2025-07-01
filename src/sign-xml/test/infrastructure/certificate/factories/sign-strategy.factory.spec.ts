import { SignStrategyFactory } from "../../../../infrastructure/certificate/factories";
import { UanatacaStrategy } from "../../../../infrastructure/certificate/strategies";
import { UnknownSignStrategyError } from "../../../../infrastructure/errors";

describe("SignStrategyFactory", () => {
  let factory: SignStrategyFactory;

  beforeEach(() => {
    factory = new SignStrategyFactory();
  });

  it("debería retornar la estrategia que soporta el friendlyName", () => {
    // Mockeamos explícitamente el método supports en UanatacaStrategy
    const uanataca = factory["strategies"].find(
      (s) => s instanceof UanatacaStrategy
    );
    jest.spyOn(uanataca!, "supports").mockReturnValue(true);

    const result = factory.getStrategy("uanataca");
    expect(result).toBeInstanceOf(UanatacaStrategy);
    expect(uanataca!.supports).toHaveBeenCalledWith("uanataca");
  });

  it("debería lanzar UnknownSignStrategyError si ninguna estrategia lo soporta", () => {
    // Nos aseguramos de que ninguna estrategia soporte el nombre
    factory["strategies"].forEach((strategy) =>
      jest.spyOn(strategy, "supports").mockReturnValue(false)
    );

    expect(() => factory.getStrategy("desconocido")).toThrow(
      UnknownSignStrategyError
    );

    expect(() => factory.getStrategy("desconocido")).toThrow(
      "No existe estrategia para el certificado: desconocido"
    );
  });
});
