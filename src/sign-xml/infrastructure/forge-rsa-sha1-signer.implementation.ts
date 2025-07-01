import * as forge from "node-forge";
import { SignerPort } from "../domain/ports";

export class ForgeRsaSha1Signer implements SignerPort {
  constructor(private readonly privateKey: forge.pki.rsa.PrivateKey) {}

  signSha1RsaBase64(input: string): string {
    const md = forge.md.sha1.create();
    md.update(input, "utf8");

    const rawSignature = this.privateKey.sign(md);
    const base64Signature = forge.util.encode64(rawSignature);

    // Esto es opcional: dividir en líneas de 76 caracteres según XAdES
    return base64Signature.match(/.{1,76}/g)?.join("\n") ?? base64Signature;
  }
}
