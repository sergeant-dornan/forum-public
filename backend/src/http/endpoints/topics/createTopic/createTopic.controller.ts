import type { HTTP, Topic } from "@forum/shared";
import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import createTopicService from './createTopic.service.js';

export default async function createTopicController(
  req: Request, res: Response<HTTP.ResponseBody.CreateTopic>, next: NextFunction
): Promise<void> {
  try {
    const title: Topic["title"] = req.body.title;
    const categoryId: Topic["categoryId"] = parseNumber(req.body.categoryId);
    const description: Topic["description"] = req.body.description;
    const userId: Topic["userId"] = parseNumber(req.userId);

    const topic = await createTopicService(title, categoryId, userId, description);

    res.status(201).json(topic);
  }
  catch (error) {
    next(error);
  }
}