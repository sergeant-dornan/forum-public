import type WebSocket from 'ws';
import socketStore from '@/app/ws/core/socketStore.ws.js';
import { ClientError } from '@/shared/utils/CustomErrors.js';
import type { DeleteTopicRole } from '@forum/shared/ws';
import deleteTopicRoleService from './deleteTopicRole.service.js';

export default async function deleteTopicRoleSocket(
  ws: WebSocket, request: DeleteTopicRole.Request
): Promise<void> {
  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const { userId: actorUserId } = context;
  const { topicId, targetUserId } = request.payload;

  await deleteTopicRoleService(topicId, targetUserId, actorUserId);

  socketStore.broadcastToAll({
    event: "topic:roleDeleted",
    payload: { userId: targetUserId, topicId }
  });
}