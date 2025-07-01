// domain/signature/XMLNamespaces.ts
export enum XML_NAMESPACES_ENUM {
  DS = "http://www.w3.org/2000/09/xmldsig#",
  ETSI = "http://uri.etsi.org/01903/v1.3.2#",
}

export const XMLNS_ATTRIBUTE = `xmlns:ds="${XML_NAMESPACES_ENUM.DS}" xmlns:etsi="${XML_NAMESPACES_ENUM.ETSI}"`;

export enum DIGEST_ALGORITHMS {
  SHA1 = "http://www.w3.org/2000/09/xmldsig#sha1",
}

// domain/signature/SignatureAlgorithms.ts
export enum SIGNATURE_ALGORITHMS {
  RSA_SHA1 = "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
}

// domain/signature/TransformAlgorithms.ts
export enum TRANSFORM_ALGORITHMS {
  ENVELOPED_SIGNATURE = "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
}

// enums/CanonicalizationAlgorithms.ts
export enum CANONICALIZATION_ALGORITHMS {
  XML_C14N_20010315 = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
}

// enums/XadesURIs.ts
export enum XADES_URIS {
  SIGNED_PROPERTIES = "http://uri.etsi.org/01903#SignedProperties",
}
