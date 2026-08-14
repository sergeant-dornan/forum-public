import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import deleteMessageService from './deleteMessage.service.js';
import type { HTTP, Message } from '@forum/shared';

export default async function deleteMessageController(
  req: Request, res: Response<HTTP.ResponseBody.DeleteMessage>, next: NextFunction
): Promise<void> {
  try {
    const messageId: Message["messageId"] = parseNumber(req.params.messageId);
    const userId = parseNumber(req.userId);

    await deleteMessageService(messageId, userId);

    res.status(204).send();
  }
  catch (error) {
    next(error);
  }
}