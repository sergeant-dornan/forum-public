import { Union } from "@forum/shared/ws";
import type { Topic, User } from "@/shared/types/domain/common.domain.js";
import WebSocket from "ws";

type SocketContext = {
  userId: User["userId"];
  topicId?: Topic["topicId"];
}

class SocketStore {
  public socketsByTopicId = new Map<Topic["topicId"], Set<WebSocket>>();
  public allSockets = new Set<WebSocket>();
  public contexts = new WeakMap<WebSocket, SocketContext>();

  // Отправить данные одному пользователю
  public sendToSocket<T extends Union.Response>(ws: WebSocket, payload: T) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }

  // Отправить данные пользователям внутри темы
  public broadcastToTopic<T extends Union.Response>(topicId: Topic["topicId"], payload: T) {
    const topicUsers = this.socketsByTopicId.get(topicId);
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
  public broadcastToAll(payload: Union.Response) {
    this.allSockets.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
      }
    });
  }
}

export default new SocketStore();