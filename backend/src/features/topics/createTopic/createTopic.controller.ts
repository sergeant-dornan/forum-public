import type { Request, Response } from 'express';
import createTopicService from './createTopic.service.js';
import { CreateTopic } from '@forum/shared/http';
import type { AuthLocals } from '@/shared/middlewares/authMiddleware.js';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';
import { topicDetailsToResponse } from '@/shared/mappers/topic.mappers.js';

export default async function createTopicController(
  req: Request<unknown, CreateTopic.ResBody, unknown, unknown, AuthLocals>, 
  res: Response<CreateTopic.ResBody, AuthLocals>
): Promise<void> {
  const parsed = parseRequest(CreateTopic, req);
  const { title, categoryId, description } = parsed.reqBody;
  const { userId } = res.locals;

  const topic = await createTopicService(title, categoryId, userId, description);
  const mapped = topicDetailsToResponse(topic);

  res.status(201).json(mapped);
}