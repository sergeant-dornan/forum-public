import type { NextFunction, Request, Response } from "express";
import { getRoleBySessionId, getRoleByUserId } from "../repositories/roles.repository.js";
import { ClientError } from "../utils/ClientError.js";
import { getSessionId } from "../utils/authUtils/authUtils.js";
import type { TopicRole, Topic } from "@forum/shared";

export async function checkBanMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const userId = Number(req?.userId);
  const topicId: Topic["topicId"] = Number(req.params.topicId)
    || Number(req.body.topicId) || Number(req.query["topic-id"]);
  if (isNaN(topicId))
    throw new Error("topicId - NaN [checkBanMiddleware]");

  let role: TopicRole["role"] | undefined;
  if (isNaN(userId)) {
    const sessionId = getSessionId(req);
    role = await getRoleBySessionId(sessionId, topicId);
  } else {
    role = await getRoleByUserId(userId, topicId);
  }
  
  if (role === "banned")
    throw new ClientError("Вы забанены в этой теме", 403);

  next();
}