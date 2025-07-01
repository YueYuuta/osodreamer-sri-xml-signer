// src/infrastructure/composition/buildSignXmlUseCase.ts

import { SignXmlUseCase } from "../../application/use-cases";
import { XadesSignatureService } from "../../domain/xades-signature.service";
import { CanonicalizerImplement } from "../canonicalizer/canonicalizer.implement";
import { ClockImplement } from "../clock/clock.implement";
import { ForgeRsaSha1Signer } from "../forge-rsa-sha1-signer.implementation";
import { HashProviderImplement } from "../hash/hash-provider.implement";
import { SignatureIdGeneratorImplement } from "../signature-generation/signature-id-generator.implement";
import { XmlDomContext } from "../xml-dom-context/xml-dom.context";
import { XmlSignatureInjector } from "../XmlSignatureInjector";
import * as forge from "node-forge";

export function buildSignXmlUseCase(
  privateKey: forge.pki.rsa.PrivateKey,
  context: XmlDomContext
): SignXmlUseCase {
  const clock = new ClockImplement();
  const canonicalizer = new CanonicalizerImplement(context);
  const hasher = new HashProviderImplement();
  const idGenerator = new SignatureIdGeneratorImplement();
  const signer = new ForgeRsaSha1Signer(privateKey);
  const injector = new XmlSignatureInjector(context);

  const xadesService = new XadesSignatureService(
    clock,
    canonicalizer,
    hasher,
    idGenerator,
    signer
  );

  return new SignXmlUseCase(xadesService, injector);
}
