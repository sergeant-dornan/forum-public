import type { HTTP, Topic, User } from "@forum/shared";
import { parseNumber } from "@/shared/utils/parseNumber.js";
import type { NextFunction, Request, Response } from "express";
import deleteUserRoleService from "./deleteUserRole.service.js";

export default async function deleteUserRoleController(
  req: Request, res: Response<HTTP.ResponseBody.DeleteUserRole>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);
    const targetUserId: User["userId"] = parseNumber(req.params.userId);
    const actorUserId = parseNumber(req.userId);
  
    await deleteUserRoleService(topicId, targetUserId, actorUserId);

    res.status(204).send();
  }
  catch (err) {
    next(err);
  }
}