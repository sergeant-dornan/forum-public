import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import closeTopicService from './closeTopic.service.js';
import hideTopicService from './hideTopic.service.js';
import openTopicService from './openTopic.service.js';
import { ClientError } from '@/shared/utils/ClientError.js';
import type { HTTP, Topic } from '@forum/shared';

export default async function changeTopicStatusController(
  req: Request, res: Response<HTTP.ResponseBody.ChangeTopicStatus>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);
    const userId = parseNumber(req.userId);
    const status: Topic["status"] = req.body.status;

    if (!status) throw new Error(`Статус - ${status}`);

    let result: Topic["status"];
    switch (status) {
      case "closed":
        result = await closeTopicService(topicId, userId);
        break;
      case "hidden":
        result = await hideTopicService(topicId, userId);
        break;
      case "open":
        result = await openTopicService(topicId, userId);
        break;
      default:
        throw new ClientError(`Неизвестный статус темы: ${status}`, 400);
    }

    res.status(200).json(result);
  }
  catch (error) {
    next(error);
  }
}