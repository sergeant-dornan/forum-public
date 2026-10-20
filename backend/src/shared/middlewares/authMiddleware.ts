import type { NextFunction, Request, Response } from "express";
import { getSessionId } from "../utils/authUtils/authUtils.js";
import { getUserIdBySessionId } from "@/features/auth/checkSession/checkSession.repository.js";
import { ClientError } from "../utils/CustomErrors.js";
import type { User } from "@/shared/types/domain/common.domain.js";

export interface AuthLocals {
  userId: User["userId"];
}

export async function authMiddleware(
  req: Request<unknown, unknown, unknown, unknown, AuthLocals>, 
  res: Response<unknown, AuthLocals>, 
  next: NextFunction
) {
  const sessionId = getSessionId(req);
  if (!sessionId) throw new ClientError("Не аутентифицирован", 401);
  
  const userId = await getUserIdBySessionId(sessionId);
  if (!userId) throw new ClientError("Не аутентифицирован", 401);

  res.locals.userId = userId;
  next();
}