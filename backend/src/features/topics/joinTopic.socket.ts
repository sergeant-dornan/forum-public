import type WebSocket from 'ws';
import socketStore from '@/app/ws/core/socketStore.ws.js';
import type { JoinTopic } from '@forum/shared/ws';
import { ClientError } from '@/shared/utils/CustomErrors.js';

export default async function joinTopicSocket(
  ws: WebSocket, request: JoinTopic.Request
): Promise<void> {
  const { topicId: newTopicId } = request.payload;

  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const oldTopicId = context.topicId;

  // Отписываем пользователя от старой темы
  if (oldTopicId) {
    const oldTopicSockets = socketStore.socketsByTopicId.get(oldTopicId);
    oldTopicSockets?.delete(ws);
    if (oldTopicSockets?.size === 0) 
      socketStore.socketsByTopicId.delete(oldTopicId);
  }

  // Подписываем на новую тему
  const newTopicSockets = socketStore.socketsByTopicId.get(newTopicId) ?? new Set();
  newTopicSockets.add(ws);
  socketStore.socketsByTopicId.set(newTopicId, newTopicSockets);

  // Обновляем тему в контексте
  socketStore.contexts.set(ws, { ...context, topicId: newTopicId });
}