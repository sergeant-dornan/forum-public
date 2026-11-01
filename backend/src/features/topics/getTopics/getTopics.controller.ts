import type { Request, Response } from 'express';
import getTopicsService from './getTopics.service.js';
import type { GetTopics } from '@forum/shared/http';
import { topicListItemToResponse } from '@/shared/mappers/topic.mappers.js';

export default async function getTopicsController(
  _req: Request<unknown, GetTopics.ResBody, unknown, unknown, {}>,
  res: Response<GetTopics.ResBody, {}>
): Promise<void> {
  const topics = await getTopicsService();
  const mapped = topicListItemToResponse(topics);

  res.status(200).json(mapped);
}