export type AppErrorType =
  "UserError"
  | "ApiError"
  | "AuthError"
  | "NotFoundError"
  | "ConflictError"
  | "NetworkError"
  | "UnexpectedError";

export interface AppError {
  readonly __isAppError: true;
  type: AppErrorType;
  message: string;
}