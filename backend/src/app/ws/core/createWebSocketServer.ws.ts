import type { Server } from "http";
import { WebSocketServer } from "ws";

  // Создаем WSS с настройкой CORS
export const createWebSocketServer = (server: Server) => new WebSocketServer({
  server,
  verifyClient: (info, callback) => {
    const origin = info.origin || info.req.headers.origin;

    // Если origin пуст, разрешаем все подключения
    if (!process.env.ALLOWED_ORIGINS) {
      callback(true);
      return;
    }
    // Разрешаем если origin в списке или не указан (не из браузера)
    if (!origin || process.env.ALLOWED_ORIGINS.split(",").includes(origin)) {
      callback(true);
    } else {
      callback(false, 403, 'Origin not allowed');
    }
  }
})