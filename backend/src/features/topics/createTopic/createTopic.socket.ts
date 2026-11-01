import createTopicService from './createTopic.service.js';
import { topicDetailsToResponse } from '@/shared/mappers/topic.mappers.js';
import type WebSocket from 'ws';
import type { CreateTopic } from '@forum/shared/ws';
import socketStore from '@/app/ws/core/socketStore.ws.js';
import { ClientError } from '@/shared/utils/CustomErrors.js';

export default async function createTopicSocket(
  ws: WebSocket, request: CreateTopic.Request
): Promise<void> {
  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const { userId } = context;
  const { title, categoryId, description } = request.payload;

  const topic = await createTopicService(title, categoryId, userId, description);
  const mapped = topicDetailsToResponse(topic);

  socketStore.broadcastToAll({
    event: "topic:created",
    payload: mapped
  });
}