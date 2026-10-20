import type { Request, Response } from "express";
import changeTopicRoleService from "./changeTopicRole.service.js";
import { ChangeTopicRole } from "@forum/shared/http";
import { parseRequest } from "@/shared/utils/parsers/parseRequest/parseRequest.js";
import type { AuthLocals } from "@/shared/middlewares/authMiddleware.js";

export default async function changeTopicRoleController(
  req: Request<unknown, ChangeTopicRole.ResBody, unknown, unknown, AuthLocals>, 
  res: Response<ChangeTopicRole.ResBody, AuthLocals>
): Promise<void> {
  const parsed = parseRequest(ChangeTopicRole, req);
  const { topicId } = parsed.params;
  const { newRole, targetUserId } = parsed.reqBody;
  const actorUserId = res.locals.userId;

  const settedRole = await changeTopicRoleService(topicId, newRole, targetUserId, actorUserId);

  res.status(200).json(settedRole);
}