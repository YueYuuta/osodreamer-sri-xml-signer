import { UnknownSignStrategyError } from "../../errors";
import { SignStrategy } from "../../interfaces";
import {
  BancoCentralStrategy,
  SecurityDataStrategy,
  UanatacaStrategy,
} from "../strategies";

export class SignStrategyFactory {
  private readonly strategies: SignStrategy[] = [
    new BancoCentralStrategy(),
    new SecurityDataStrategy(),
    new UanatacaStrategy(),
  ];

  getStrategy(friendlyName: string): SignStrategy {
    const strategy = this.strategies.find((s) => s.supports(friendlyName));
    if (!strategy) {
      throw new UnknownSignStrategyError(friendlyName);
    }
    return strategy;
  }
}
