import type { Request, Response } from 'express';
import deleteTopicService from './deleteTopic.service.js';
import { DeleteTopic } from '@forum/shared/http';
import type { AuthLocals } from '@/shared/middlewares/authMiddleware.js';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';

export default async function deleteTopicController(
  req: Request<unknown, DeleteTopic.ResBody, unknown, unknown, AuthLocals>,
  res: Response<DeleteTopic.ResBody, AuthLocals>
): Promise<void> {
  const parsed = parseRequest(DeleteTopic, req);
  const { topicId } = parsed.params;
  const { userId } = res.locals;

  await deleteTopicService(topicId, userId);

  res.status(204).send();
}