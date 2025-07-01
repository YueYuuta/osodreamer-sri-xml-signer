export interface SignXmlRequest {
  p12Buffer: Uint8Array;
  password: string;
  xmlBuffer: Uint8Array;
}
