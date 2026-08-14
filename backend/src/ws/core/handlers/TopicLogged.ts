import type WebSocket from "ws";
import MessageHandler from "../MessageHandler.js";
import type { WS } from "@forum/shared";

export default class TopicLoggedHandler extends MessageHandler {
  async handle(ws: WebSocket, data: WS.Data.TopicLogged) {
    const { topicId } = data;

    // Удаляем пользователя из всех предыдущих тем
    this.usersByTopicId.forEach((users, existingTopicId) => {
      if (users.has(ws)) {
        users.delete(ws);
        if (users.size === 0)
          this.usersByTopicId.delete(existingTopicId);
      }
    })

    // Добавление в новую тему
    const topicUsers = this.usersByTopicId.get(topicId) ?? new Set();
    this.usersByTopicId.set(topicId, topicUsers);
    topicUsers.add(ws);
  }
}