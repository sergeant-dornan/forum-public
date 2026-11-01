import type WebSocket from 'ws';
import socketStore from '@/app/ws/core/socketStore.ws.js';
import { ClientError } from '@/shared/utils/CustomErrors.js';
import type { DeleteTopic } from '@forum/shared/ws';
import deleteTopicService from './deleteTopic.service.js';

export default async function deleteTopicSocket(
  ws: WebSocket, request: DeleteTopic.Request
): Promise<void> {
  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const { userId } = context;
  const { topicId } = request.payload;

  await deleteTopicService(topicId, userId);

  socketStore.broadcastToAll({
    event: "topic:deleted",
    payload: { topicId }
  });
}