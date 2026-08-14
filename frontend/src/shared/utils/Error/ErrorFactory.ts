import type { AppError } from "./Error.types";

export default class ErrorFactory {
  private static readonly base = { __isAppError: true as const };

  static userError(message: string): AppError {
    return { ...this.base, type: "UserError", message };
  }

  static authError(message: string): AppError {
    return { ...this.base, type: "AuthError", message };
  }

  static notFoundError(message: string): AppError {
    return { ...this.base, type: "NotFoundError", message };
  }

  static conflictError(message: string): AppError {
    return { ...this.base, type: "ConflictError", message };
  }

  static apiError(message?: string): AppError {
    return { ...this.base, type: "ApiError", message: message || "Попробуйте позже" };
  }

  static unexpectedError(): AppError {
    return { ...this.base, type: "UnexpectedError", message: "Попробуйте позже" };
  }

  static networkError(): AppError {
    return { ...this.base, type: "NetworkError", message: "Попробуйте позже" };
  }
}