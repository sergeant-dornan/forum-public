import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import getTopicRolesService from './getTopicRoles.service.js';
import type { HTTP, Topic } from '@forum/shared';

// Получаем роли определенной темы
export default async function getTopicRolesController(
  req: Request, res: Response<HTTP.ResponseBody.GetTopicRoles>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);
    
    const roles = await getTopicRolesService(topicId);

    res.status(200).json(roles);
  }
  catch (error) {
    next(error);
  }
};