import type { Request, Response } from 'express';
import getUserTopicsService from './getUserTopics.service.js';
import type { GetUserTopics } from '@forum/shared/http';
import type { AuthLocals } from '@/shared/middlewares/authMiddleware.js';
import { topicListItemToResponse } from '@/shared/mappers/topic.mappers.js';

export default async function getUserTopicsController(
  _req: Request<unknown, GetUserTopics.ResBody, unknown, unknown, AuthLocals>,
  res: Response<GetUserTopics.ResBody, AuthLocals>
): Promise<void> {
  const { userId } = res.locals;

  const topics = await getUserTopicsService(userId);
  const mapped = topicListItemToResponse(topics)

  res.status(200).json(mapped);
}