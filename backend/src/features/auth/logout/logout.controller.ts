import type { Request, Response } from 'express';
import { getSessionId } from '@/shared/utils/authUtils/authUtils.js';
import logoutService from './logout.service.js';
import type { Logout } from '@forum/shared/http';

export default async function logoutController(
  req: Request<unknown, Logout.ResBody, unknown, unknown, {}>, 
  res: Response<Logout.ResBody, {}>
): Promise<void> {
  const sessionId = getSessionId(req);

  await logoutService(sessionId);

  res.status(200).send();
}