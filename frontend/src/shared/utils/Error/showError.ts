import { showErrorMessage, showInfoMessage } from "../swalUtils";
import type { AppError } from "./Error.types";

export function showError(error: AppError) {
  switch (error.type) {
    case "UserError":
      showInfoMessage("Ошибка пользователя", error.message);
      break;
    case "ApiError":
      showErrorMessage("Ошибка сервера", error.message);
      break;
    case "AuthError":
      showErrorMessage("Ошибка доступа", error.message);
      break;
    case "NetworkError":
      showErrorMessage("Ошибка сети", error.message);
      break;
    case "NotFoundError":
      showErrorMessage("Не найдено", error.message);
      break;
    case "ConflictError":
      showInfoMessage("Конфликт имён", error.message);
      break;
    case "UnexpectedError":
      showErrorMessage("Ошибка", error.message);
      break;
    default:
      showErrorMessage("Ошибка", "Неизвестная ошибка");
  }
}