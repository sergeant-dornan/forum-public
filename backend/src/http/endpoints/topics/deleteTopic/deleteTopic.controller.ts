import type { HTTP, Topic } from "@forum/shared";
import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import deleteTopicService from './deleteTopic.service.js';

export default async function deleteTopicController(
  req: Request, res: Response<HTTP.ResponseBody.DeleteTopic>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);
    const userId = parseNumber(req.userId);

    await deleteTopicService(topicId, userId);

    res.status(204).send();
  }
  catch (error) {
    next(error);
  }
}