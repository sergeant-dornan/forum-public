import { getSessionId } from '@/shared/utils/authUtils/authUtils.js';
import type { Request, Response } from 'express';
import checkSessionService from './checkSession.service.js';
import type { CheckSession } from '@forum/shared/http';

export default async function checkSessionController(
  req: Request<unknown, CheckSession.ResBody, unknown, unknown, {}>, 
  res: Response<CheckSession.ResBody, {}>
): Promise<void> {
  const sessionId = getSessionId(req);

  await checkSessionService(sessionId);

  res.status(204).send();
}