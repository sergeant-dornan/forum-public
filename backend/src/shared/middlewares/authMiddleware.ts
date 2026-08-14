import type { NextFunction, Request, Response } from "express";
import { getSessionId } from "../utils/authUtils/authUtils.js";
import { getUserIdBySessionId } from "@/http/endpoints/auth/checkSession/checkSession.repository.js";
import { ClientError } from "../utils/ClientError.js";

export async function authMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const sessionId = getSessionId(req);
  const userId = await getUserIdBySessionId(sessionId);
  if (!userId) 
    throw new ClientError("Не аутентифицирован", 401);

  req.userId = userId;
  next();
}