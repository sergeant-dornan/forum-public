import type { NextFunction, Request, Response } from 'express';
import createMessageService from './createMessage.service.js';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import type { HTTP, Message } from '@forum/shared';

export default async function createMessageController(
  req: Request, res: Response<HTTP.ResponseBody.CreateMessage>, next: NextFunction
): Promise<void> {
  try {
    const message: Message["textContent"] = req.body.message;
    const topicId: Message["topicId"] = parseNumber(req.body.topicId); 
    const userId: Message["userId"] = parseNumber(req.userId);

    const createdMessage = await createMessageService(message, topicId, userId);

    res.status(200).json(createdMessage);
  }
  catch (error) {
    next(error);
  }
}
