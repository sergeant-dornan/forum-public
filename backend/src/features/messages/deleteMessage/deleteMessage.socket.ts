import type { DeleteMessage } from '@forum/shared/ws';
import deleteMessageService from './deleteMessage.service.js';
import socketStore from '@/app/ws/core/socketStore.ws.js';
import { ClientError } from '@/shared/utils/CustomErrors.js';
import type WebSocket from 'ws';

export default async function deleteMessageSocket(
  ws: WebSocket, request: DeleteMessage.Request
): Promise<void> {
  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const { userId } = context;
  const { messageId, topicId } = request.payload;

  await deleteMessageService(messageId, userId);

  socketStore.broadcastToTopic(topicId, {
    event: "message:deleted",
    payload: { topicId, messageId }
  });
}