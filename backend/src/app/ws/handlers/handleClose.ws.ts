import type WebSocket from "ws";
import socketStore from "../core/socketStore.ws.js";

export function handleClose(ws: WebSocket) {
  const ctx = socketStore.contexts.get(ws);

  if (ctx) {
    const { topicId } = ctx;

    // Если пользователь в теме, то удаляем его из темы
    if (topicId) {
      const topic = socketStore.socketsByTopicId.get(topicId);
      topic?.delete(ws);
      if (topic?.size === 0) socketStore.socketsByTopicId.delete(topicId);
    }
  }

  socketStore.allSockets.delete(ws);
}