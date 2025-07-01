import { XMLValidator } from "fast-xml-parser";

/**
 * Asserts that the provided binary content is valid XML.
 * Throws an error if the XML is invalid.
 *
 * @param {Uint8Array} buffer - Binary content containing XML data.
 * @throws {Error} If the XML is invalid.
 */
export function assertValidXml(buffer: Uint8Array): void {
  const content = new TextDecoder("utf-8").decode(buffer);
  const validation = XMLValidator.validate(content);

  if (validation !== true) {
    throw new Error("Invalid XML: " + JSON.stringify(validation));
  }
}

export function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
/**
 * Convierte etiquetas autocerradas como <tag/> o <tag attr="value"/> en <tag></tag>
 * Compatible con HTML/XML básico sin namespaces.
 */
export function normalizeSelfClosingTags(xml: string): string {
  return xml.replace(/<([\w:-]+)([^>]*)\/>/g, (_match, tag, attrs) => {
    return `<${tag}${attrs}></${tag}>`;
  });
}
