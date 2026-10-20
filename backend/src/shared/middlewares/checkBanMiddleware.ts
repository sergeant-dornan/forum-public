import type { NextFunction, Request, Response } from "express";
import { getRoleByUserId } from "../repositories/roles.repository.js";
import { ClientError } from "../utils/CustomErrors.js";
import type { AuthLocals } from "./authMiddleware.js";
import type { Topic } from "@/shared/types/domain/common.domain.js";

type ReqTopicId = { topicId?: Topic["topicId"] }

export async function checkBanMiddleware(
  req: Request<ReqTopicId, unknown, ReqTopicId, ReqTopicId, AuthLocals>,
  res: Response<unknown, AuthLocals>,
  next: NextFunction
) {
  const userId = res.locals.userId;
  const topicId = req.params.topicId || req.body.topicId || req.query.topicId;
  if (topicId === undefined) throw new Error("topicId - undefined [checkBanMiddleware]");

  const role = await getRoleByUserId(userId, topicId);
  if (role === "banned") throw new ClientError("Вы забанены в этой теме", 403);

  next();
}