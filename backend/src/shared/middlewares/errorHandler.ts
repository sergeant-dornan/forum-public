import type { Request, Response, NextFunction } from 'express';
import { ClientError } from '@/shared/utils/ClientError.js';
import type { HTTP } from '@forum/shared';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response<HTTP.Core.ErrorResponseBody>,
  next: NextFunction
) {
  // Бизнес-ошибки - отправляем пользователю
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // Логируем ошибку с деталями запроса
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path}`, err);

  // Системные ошибки - только 500 без деталей для клиента
  return res.status(500).json({
    message: "Внутренняя ошибка сервера"
  });
}