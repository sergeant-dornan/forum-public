import type { AppError } from "@/shared/utils/Error/Error.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import type { Error } from "@forum/shared/ws";

class WsErrorValidator {
  private validateAuthError(error: Error.Response): AppError | undefined {
    switch (error.payload.code) {
      case 4401: return ErrorFactory.authError(error.payload.message || "Войдите заново");
      case 4403: return ErrorFactory.authError(error.payload.message || "У вас нет прав для этого действия");
      case 4419: return ErrorFactory.authError(error.payload.message || "Войдите заново");
      default: return;
    }
  }


  private validateUserError(error: Error.Response): AppError | undefined {
    switch (error.payload.code) {
      case 4400: return ErrorFactory.userError(error.payload.message || "Неверный формат данных");
      case 4404: return ErrorFactory.notFoundError(error.payload.message || "Ресурс не найден");
      case 4409: return ErrorFactory.conflictError(error.payload.message || "Конфликт данных");
      case 4422: return ErrorFactory.userError(error.payload.message || "Ошибка валидации");
      case 4429: return ErrorFactory.userError(error.payload.message || "Слишком много запросов. Попробуйте позже");
      default: return;
    }
  }


  private validateServerError(error: Error.Response): AppError | undefined {
    switch (error.payload.code) {
      case 4500: return ErrorFactory.apiError();
      case 4502: return ErrorFactory.apiError(error.payload.message || "Сервер временно недоступен");
      case 4503: return ErrorFactory.apiError(error.payload.message || "Сервер на обслуживании. Попробуйте позже");
      case 4504: return ErrorFactory.apiError(error.payload.message || "Сервер не отвечает. Попробуйте позже");
      default: return;
    }
  }


  public validate(error: Error.Response): AppError {
    const authErrorValidationResult = this.validateAuthError(error);
    if (authErrorValidationResult !== undefined) return authErrorValidationResult;

    const userErrorValidationResult = this.validateUserError(error);
    if (userErrorValidationResult !== undefined) return userErrorValidationResult;

    const serverErrorValidationResult = this.validateServerError(error);
    if (serverErrorValidationResult !== undefined) return serverErrorValidationResult;

    return ErrorFactory.apiError();
  }
}

export default new WsErrorValidator();