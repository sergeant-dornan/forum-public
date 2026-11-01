import { ClientError } from '@/shared/utils/CustomErrors.js';
import type WebSocket from 'ws';
import type { ChangeTopicStatus } from '@forum/shared/ws';
import socketStore from '@/app/ws/core/socketStore.ws.js';
import changeTopicStatusStrategy from './changeTopicStatus.strategy.js';

export default async function changeTopicStatusSocket(
  ws: WebSocket, request: ChangeTopicStatus.Request
): Promise<void> {
  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const { userId } = context;
  const { topicId, status } = request.payload;

  if (!status) throw new Error(`Статус - ${status}`);

  const changedStatus = await changeTopicStatusStrategy(topicId, userId, status);

  socketStore.broadcastToAll({
    event: "topic:statusChanged",
    payload: { topicId, status: changedStatus }
  })
}