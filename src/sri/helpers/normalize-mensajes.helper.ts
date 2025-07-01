import { SriAuthorizationMessage } from "../interfaces";

/**
 * Normalize the SRI `mensaje` property to always return an array.
 */
export function normalizeSriMessages(
  message: SriAuthorizationMessage | SriAuthorizationMessage[] | undefined
): SriAuthorizationMessage[] | null {
  if (!message) return null;
  return Array.isArray(message) ? message : [message];
}
