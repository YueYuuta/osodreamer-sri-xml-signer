export interface HashProviderPort {
  sha1Base64(input: string): string;
  sha1RawBase64(input: Uint8Array): string;
}
