import * as forge from "node-forge";
import { SignStrategy } from "../../interfaces";
import {
  PrivateKeyExtractionError,
  SigningKeyNotFoundError,
  UanatacaCertificateNotFoundError,
} from "../../errors";

export class UanatacaStrategy implements SignStrategy {
  supports(friendlyName: string): boolean {
    return /UANATACA/i.test(friendlyName);
  }

  getPrivateKey(
    bags: forge.pkcs12.Bag[]
  ): forge.pki.PrivateKey | forge.asn1.Asn1 {
    const item = bags[0];
    if (!item) throw new SigningKeyNotFoundError("UANATACA");
    if (item?.key) {
      return item.key;
    } else if (item?.asn1) {
      return forge.pki.privateKeyFromAsn1(item.asn1);
    } else {
      throw new PrivateKeyExtractionError();
    }
  }

  overrideIssuerName(certBags: forge.pkcs12.Bag[]): string {
    const certItems = certBags[forge.pki.oids.certBag];
    if (!certItems || !certItems.length) {
      throw new UanatacaCertificateNotFoundError();
    }
    const cert = certItems[0].cert;

    return this.getX509IssuerName(cert);
  }

  private getX509IssuerName(cert: forge.pki.Certificate): string {
    const issuerName = cert.issuer.attributes
      .reverse()
      .filter((attr) => attr.shortName || attr.type)
      .map((attr) => {
        if (attr.shortName) {
          return `${attr.shortName}=${attr.value}`;
        } else {
          return `${attr.type}=${this.hexEncodeUtf8(attr.value)}`;
        }
      })
      .join(",");

    return issuerName;
  }
  private hexEncodeUtf8(value: string): string {
    const utf8Bytes = forge.util.encodeUtf8(value);
    const hex = forge.util.bytesToHex(utf8Bytes);
    return `#0c${utf8Bytes.length.toString(16).padStart(2, "0")}${hex}`;
  }
}
