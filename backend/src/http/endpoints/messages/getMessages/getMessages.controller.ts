import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import getMessagesService from './getMessages.service.js';
import type { HTTP, Topic } from '@forum/shared';

export default async function getMessagesController(
  req: Request, res: Response<HTTP.ResponseBody.GetMessages>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);
    const after = req.query.after ? parseNumber(req.query.after) : undefined;

    const messages = await getMessagesService(topicId, after);

    res.status(200).json(messages);
  }
  catch (error) {
    next(error);
  }
}