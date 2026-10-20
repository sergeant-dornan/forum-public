import type { Request, Response } from 'express';
import getTopicService from './getTopic.service.js';
import { GetTopic } from '@forum/shared/http';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';
import { topicDetailsToResponse } from '@/shared/mappers/topic.mappers.js';

export default async function getTopicController(
  req: Request<unknown, GetTopic.ResBody, unknown, unknown, {}>,
  res: Response<GetTopic.ResBody, {}>
): Promise<void> {
  const parsed = parseRequest(GetTopic, req);
  const { topicId } = parsed.params;

  const topic = await getTopicService(topicId);
  const mapped = topicDetailsToResponse(topic);

  res.status(200).json(mapped);
}