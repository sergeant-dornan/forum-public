import type { Request, Response } from 'express';
import { ChangeTopicStatus } from '@forum/shared/http';
import type { AuthLocals } from '@/shared/middlewares/authMiddleware.js';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';
import changeTopicStatusStrategy from './changeTopicStatus.strategy.js';

export default async function changeTopicStatusController(
  req: Request<unknown, ChangeTopicStatus.ResBody, unknown, unknown, AuthLocals>,
  res: Response<ChangeTopicStatus.ResBody, AuthLocals>
): Promise<void> {
  const parsed = parseRequest(ChangeTopicStatus, req);
  const { topicId } = parsed.params;
  const { status } = parsed.reqBody;
  const { userId } = res.locals;

  if (!status) throw new Error(`Статус - ${status}`);

  const changedStatus = await changeTopicStatusStrategy(topicId, userId, status);

  res.status(200).json(changedStatus);
}