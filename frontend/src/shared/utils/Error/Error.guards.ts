import type { AppError, AppErrorType } from "./Error.types";

const appErrorTypes: readonly AppErrorType[] = [
  "UserError",
  "ApiError", 
  "AuthError",
  "NotFoundError",
  "ConflictError",
  "NetworkError",
  "UnexpectedError"
] as const;

export function isAppError(data: unknown): data is AppError {
  return (
    typeof data === "object"
    && data !== null
    && "__isAppError" in data
    && data.__isAppError === true
    && "type" in data
    && typeof data.type === "string"
    && appErrorTypes.includes(data.type as AppErrorType)
    && "message" in data
    && typeof data.message === "string"
  );
}