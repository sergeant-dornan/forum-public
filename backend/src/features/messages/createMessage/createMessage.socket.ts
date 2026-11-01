import type { CreateMessage } from '@forum/shared/ws';
import createMessageService from './createMessage.service.js';
import { messageListItemToResponse } from '@/shared/mappers/message.mappers.js';
import socketStore from '@/app/ws/core/socketStore.ws.js';
import type WebSocket from 'ws';
import { ClientError } from '@/shared/utils/CustomErrors.js';

export default async function createMessageSocket(
  ws: WebSocket, request: CreateMessage.Request
): Promise<void> {
  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const { userId } = context;
  const { message, topicId } = request.payload;

  const createdMessage = await createMessageService(message, topicId, userId);
  const mapped = messageListItemToResponse(createdMessage);

  socketStore.broadcastToTopic(topicId, {
    event: "message:created",
    payload: { topicId, message: mapped }
  });
}