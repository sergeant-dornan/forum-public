import type { NextFunction, Request, Response } from 'express';
import getUserTopicsService from './getUserTopics.service.js';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import type { HTTP } from '@forum/shared';

export default async function getUserTopicsController(
  req: Request, res: Response<HTTP.ResponseBody.GetUserTopics>, next: NextFunction
): Promise<void> {
  try {
    const userId = parseNumber(req.userId);

    const topics = await getUserTopicsService(userId);

    res.status(200).json(topics);
  }
  catch (error) {
    next(error);
  }
}