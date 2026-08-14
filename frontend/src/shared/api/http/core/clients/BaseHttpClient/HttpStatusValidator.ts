import type { AppError } from "@/shared/utils/Error/Error.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import type { HTTP } from "@forum/shared";

export default class HttpStatusValidator {
  private validateAuthError(res: Response, json: HTTP.Core.ErrorResponseBody): AppError | undefined {
    switch (res.status) {
      case 401: return ErrorFactory.authError(json.message || "Войдите заново");
      case 403: return ErrorFactory.authError(json.message || "У вас нет прав для этого действия");
      case 419: return ErrorFactory.authError(json.message || "Войдите заново");
      default: return;
    }
  }


  private validateUserError(res: Response, json: HTTP.Core.ErrorResponseBody): AppError | undefined {
    switch (res.status) {
      case 400: return ErrorFactory.userError(json.message || "Неверный формат данных");
      case 404: return ErrorFactory.notFoundError(json.message || "Ресурс не найден");
      case 409: return ErrorFactory.conflictError(json.message || "Конфликт данных");
      case 422: return ErrorFactory.userError(json.message || "Ошибка валидации");
      case 429: return ErrorFactory.userError(json.message || "Сервер перегружен. Попробуйте позже");
      default: return;
    }
  }


  private validateServerError(res: Response, json: HTTP.Core.ErrorResponseBody): AppError | undefined {
    switch (res.status) {
      case 500: return ErrorFactory.apiError();
      case 502: return ErrorFactory.apiError(json.message || "Сервер временно недоступен");
      case 503: return ErrorFactory.apiError(json.message || "Сервер на обслуживании. Попробуйте позже");
      case 504: return ErrorFactory.apiError(json.message || "Сервер не отвечает. Попробуйте позже");
      default: return;
    }
  }


  public hasBody(res: Response): boolean {
    switch (res.status) {
      case 204: return false;
      case 205: return false;
      case 304: return false;
    }

    const contentLength = res.headers.get("content-length");
    if (contentLength !== null && Number(contentLength) === 0) return false;
    
    return true;
  }



  public validateResponseError(res: Response, json: HTTP.Core.ErrorResponseBody): AppError {
    const authErrorValidationResult = this.validateAuthError(res, json);
    if (authErrorValidationResult !== undefined) return authErrorValidationResult;

    const userErrorValidationResult = this.validateUserError(res, json);
    if (userErrorValidationResult !== undefined) return userErrorValidationResult;

    const serverErrorValidationResult = this.validateServerError(res, json);
    if (serverErrorValidationResult !== undefined) return serverErrorValidationResult;

    return ErrorFactory.apiError();
  }
}