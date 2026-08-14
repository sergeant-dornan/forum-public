import type { NextFunction, Request, Response } from 'express';
import { getSessionId } from '@/shared/utils/authUtils/authUtils.js';
import logoutService from './logout.service.js';
import type { HTTP } from '@forum/shared';

export default async function logoutController(
  req: Request, res: Response<HTTP.ResponseBody.Logout>, next: NextFunction
): Promise<void> {
  try {
    const sessionId = getSessionId(req);

    await logoutService(sessionId);

    res.status(200).send();
  }
  catch (error) {
    next(error);
  }
}