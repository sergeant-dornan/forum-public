import type { Request, Response } from 'express';
import getUserRolesService from './getUserRoles.service.js';
import type { AuthLocals } from '@/shared/middlewares/authMiddleware.js';
import type { GetUserRoles } from '@forum/shared/http';

export default async function getUserRolesController(
  _req: Request<unknown, GetUserRoles.ResBody, unknown, unknown, AuthLocals>,
  res: Response<GetUserRoles.ResBody, AuthLocals>
): Promise<void> {
  const { userId } = res.locals;

  const roles = await getUserRolesService(userId);

  res.status(200).json(roles);
};