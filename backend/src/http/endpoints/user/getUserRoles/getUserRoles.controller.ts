import type { NextFunction, Request, Response } from 'express';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import getUserRolesService from './getUserRoles.service.js';
import type { HTTP } from '@forum/shared';

// Получаем роли определенной темы
export default async function getUserRolesController(
  req: Request, res: Response<HTTP.ResponseBody.GetUserRoles>, next: NextFunction
): Promise<void> {
  try {
    const userId = parseNumber(req.userId);

    const roles = await getUserRolesService(userId);
    
    res.status(200).json(roles);
  }
  catch (error) {
    next(error);
  }
};