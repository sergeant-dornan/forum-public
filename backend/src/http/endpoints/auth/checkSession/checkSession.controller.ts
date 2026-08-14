import { getSessionId } from '@/shared/utils/authUtils/authUtils.js';
import type { NextFunction, Request, Response } from 'express';
import checkSessionService from './checkSession.service.js';
import type { HTTP } from '@forum/shared';

export default async function checkSessionController(
  req: Request, res: Response<HTTP.ResponseBody.CheckSession>, next: NextFunction
): Promise<void> {
  try {
    // Беру сессию из headers
    const sessionId = getSessionId(req);

    await checkSessionService(sessionId);

    res.status(204).send();
  }
  catch (error) {
    next(error);
  }
}