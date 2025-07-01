import { ErrorCode } from "../types/error-code.type";

export interface HandledError {
  code: ErrorCode;
  message: string;
  original: Error;
}
