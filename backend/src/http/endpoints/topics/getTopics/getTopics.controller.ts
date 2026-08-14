import type { NextFunction, Request, Response } from 'express';
import getTopicsService from './getTopics.service.js';
import type { HTTP } from '@forum/shared';

export default async function getTopicsController(
  req: Request, res: Response<HTTP.ResponseBody.GetTopics>, next: NextFunction
): Promise<void> {
  try {
    const topics = await getTopicsService();

    res.status(200).json(topics);
  }
  catch (error) {
    next(error);
  }
}