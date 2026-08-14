import type { TopicRole, Topic, User, HTTP } from "@forum/shared";
import { parseNumber } from "@/shared/utils/parseNumber.js";
import type { NextFunction, Request, Response } from "express";
import changeUserRoleService from "./changeUserRole.service.js";

export default async function changeUserRoleController(
  req: Request, res: Response<HTTP.ResponseBody.ChangeUserRole>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);
    const newRole: TopicRole["role"] = req.body.role;
    const targetUserId: User["userId"] = parseNumber(req.body.userId);
    const actorUserId = parseNumber(req.userId);
  
    const settedRole = await changeUserRoleService(topicId, newRole, targetUserId, actorUserId);

    res.status(200).json(settedRole);
  }
  catch (err) {
    next(err);
  }
}