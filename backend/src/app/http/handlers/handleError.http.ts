import type { Request, Response, NextFunction } from 'express';
import { ClientError, RequestValidationError } from '@/shared/utils/CustomErrors.js';
import type { Error } from '@forum/shared/http';

export function handleError(
  err: unknown,
  req: Request<Error.Params, Error.ResBody, Error.ReqBody, Error.ResBody>,
  res: Response<Error.ResBody>,
  next: NextFunction
) {
  // Бизнес-ошибки - отправляем пользователю
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // Ошибка валидации
  if (err instanceof RequestValidationError) {
    return res.status(400).json({
      message: "Внутренняя ошибка сервера",
      validationErrorLocation: err.validationErrorLocation,
      requestValidationIssues: err.issues
    });
  }

  // Логируем ошибку с деталями запроса
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path}`, err);

  // Системные ошибки - только 500 без деталей для клиента
  return res.status(500).json({
    message: "Внутренняя ошибка сервера"
  });
}