import * as forge from "node-forge";

export class CryptoUtils {
  hexToBase64(str: string): string {
    let hex = ("00" + str).slice(0 - str.length - (str.length % 2));
    const binary = hex
      .replace(/\r|\n/g, "")
      .replace(/([\da-fA-F]{2}) ?/g, (match) =>
        String.fromCharCode(parseInt(match, 16))
      );
    return forge.util.encode64(binary);
  }

  bigint3base64(bigint: bigint): string {
    const hex = bigint.toString(16).padStart(2, "0");
    const binary = hex
      .match(/\w{2}/g)
      .map((a) => String.fromCharCode(parseInt(a, 16)))
      .join("");
    const base64 = forge.util.encode64(binary);
    return base64.match(/.{1,76}/g).join("\n");
  }

  p_obtener_aleatorio(): number {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return 100000 + (arr[0] % 9900000);
  }
}
