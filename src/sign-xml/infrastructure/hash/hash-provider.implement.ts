import { HashProviderPort } from "../../domain/ports";
import * as forge from "node-forge";
export class HashProviderImplement implements HashProviderPort {
  sha1Base64(input: string): string {
    const md = forge.md.sha1.create();
    md.update(input);
    const digestHex = md.digest().toHex();
    const digestBytes = forge.util.hexToBytes(digestHex);
    return forge.util.encode64(digestBytes);
  }
  sha1RawBase64(input: Uint8Array): string {
    throw new Error("Method not implemented.");
  }
}
