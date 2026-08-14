import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import getTopicService from './getTopic.service.js';
import type { HTTP, Topic } from '@forum/shared';

export default async function getTopicController(
  req: Request, res: Response<HTTP.ResponseBody.GetTopic>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);
    
    const topic = await getTopicService(topicId);

    res.status(200).json(topic);
  }
  catch (error) {
    next(error);
  }
}