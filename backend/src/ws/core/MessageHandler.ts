import type { Topic, WS } from "@forum/shared";
import WebSocket from "ws";

export default abstract class MessageHandler {
  constructor(
    protected usersByTopicId = new Map<Topic["topicId"], Set<WebSocket>>(),
    protected allSockets = new Set<WebSocket>()
  ) { }

  abstract handle(ws: WebSocket, data: WS.Core.Data): Promise<void>;

  // Отправить данные пользователям внутри темы
  protected broadcastToTopicUsers<T extends WS.Core.Message>(topicId: Topic["topicId"], payload: T): void {
    const topicUsers = this.usersByTopicId.get(topicId);
    if (!topicUsers) {
      console.warn(`Тема ${topicId} не найдена`);
      return;
    }

    topicUsers.forEach((user) => {
      if (user.readyState === WebSocket.OPEN) {
        user.send(JSON.stringify(payload));
      }
    });
  }

  // Отправить данные всем пользователям
  protected brodcastToAll<T extends WS.Core.Message>(payload: T) {
    this.allSockets.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
      }
    });
  }
}