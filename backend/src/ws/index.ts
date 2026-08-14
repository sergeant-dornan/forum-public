import WebSocket, { WebSocketServer } from "ws";
import type { Server } from "http";
import type { WS } from "@forum/shared";
import handlerRegistry from "./core/HandlerRegistry.js";
import type { Topic } from "@forum/shared";

export default function addWebSocketServer(server: Server) {
  // Создаем WSS с настройкой CORS
  const wss = new WebSocketServer({
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
  });

  // Словарь множеств {topicId: {user_1, user_2}}
  const usersByTopicId = new Map<Topic["topicId"], Set<WebSocket>>();
  const allSockets = new Set<WebSocket>();

  // Базовые обработчики 
  wss.on("connection", (ws: WebSocket) => {
    allSockets.add(ws);

    ws.on("close", () => {
      // Удаляем ws из всех топиков
      usersByTopicId.forEach((users: Set<WebSocket>, topicId: Topic["topicId"]) => {
        if (users.has(ws)) {
          users.delete(ws);
          // Если топик пуст, можно удалить его из Map
          if (users.size === 0) {
            usersByTopicId.delete(topicId);
          }
        }
      });
      allSockets.delete(ws);
    });

    ws.on("message", async (data: Buffer) => {
      try {
        const message: WS.Core.Message = JSON.parse(data.toString());

        // Получаем класс нужного обработчика с помощью регистратора
        const HandlerClass = handlerRegistry.getHandler(message.event);
        if (!HandlerClass) {
          console.warn(`Неизвестное событие: ${message.event}`);
          return;
        }

        // Создаем объект на основе класса обработчика и вызываем его метод
        const handler = new HandlerClass(usersByTopicId, allSockets);
        await handler.handle(ws, message.data);
      }
      catch (error) {
        console.error(`Ошибка обработки message WebSocket: ${error}`)
      }
    })
  });

  wss.on("error", (error) => {
    console.error("ws server error:", error);
  });

  return wss;
};