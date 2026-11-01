import { ClientError, SocketValidationError } from '@/shared/utils/CustomErrors.js';
import type WebSocket from 'ws';
import socketStore from '../core/socketStore.ws.js';

export function handleError(
  ws: WebSocket, err: unknown
) {
  // Бизнес-ошибки - отправляем пользователю
  if (err instanceof ClientError) {
    return socketStore.sendToSocket(ws, {
      event: "error",
      payload: {
        code: Number(`4${err.statusCode}`),
        message: err.message
      }
    });
  }

  // Ошибка валидации
  if (err instanceof SocketValidationError) {
    return socketStore.sendToSocket(ws, {
      event: "error",
      payload: {
        code: 4400,
        requestValidationIssues: err.issues
      }
    });
  }

  // Логируем ошибку
  console.error(`[${new Date().toISOString()}]`, err);

  // Системные ошибки - только 500 без деталей для клиента
  return socketStore.sendToSocket(ws, {
    event: "error",
    payload: {
      code: 4500,
      message: "Внутренняя ошибка сервера"
    }
  });
}