import { isAppError } from "./Error.guards";
import type { AppError } from "./Error.types";
import ErrorFactory from "./ErrorFactory";

export function toAppError(error: unknown): AppError {
  if (isAppError(error)) return error;
  return ErrorFactory.unexpectedError();
}