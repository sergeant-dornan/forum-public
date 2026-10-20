import type { Request, Response } from "express";
import deleteTopicRoleService from "./deleteTopicRole.service.js";
import { DeleteTopicRole } from "@forum/shared/http";
import type { AuthLocals } from "@/shared/middlewares/authMiddleware.js";
import { parseRequest } from "@/shared/utils/parsers/parseRequest/parseRequest.js";

export default async function deleteTopicRoleController(
  req: Request<unknown, DeleteTopicRole.ResBody, unknown, unknown, AuthLocals>,
  res: Response<DeleteTopicRole.ResBody, AuthLocals>
): Promise<void> {
  const parsed = parseRequest(DeleteTopicRole, req);
  const { topicId, userId: targetUserId } = parsed.params;
  const actorUserId = res.locals.userId;

  await deleteTopicRoleService(topicId, targetUserId, actorUserId);

  res.status(204).send();
}