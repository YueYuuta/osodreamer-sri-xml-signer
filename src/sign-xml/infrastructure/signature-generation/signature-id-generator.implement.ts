import { SignatureIdentifiersInterface } from "../../domain/interfaces";
import { SignatureIdGeneratorPort } from "../../domain/ports";

export class SignatureIdGeneratorImplement implements SignatureIdGeneratorPort {
  generateAll(): SignatureIdentifiersInterface {
    return {
      certificateNumber: this.p_obtener_aleatorio(),
      signatureNumber: this.p_obtener_aleatorio(),
      signedPropertiesNumber: this.p_obtener_aleatorio(),
      signedInfoNumber: this.p_obtener_aleatorio(),
      signedPropertiesIdNumber: this.p_obtener_aleatorio(),
      referenceIdNumber: this.p_obtener_aleatorio(),
      signatureValueNumber: this.p_obtener_aleatorio(),
      ObjectNumber: this.p_obtener_aleatorio(),
    };
  }
  p_obtener_aleatorio(): string {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return (100000 + (arr[0] % 9900000)).toString();
  }
}
