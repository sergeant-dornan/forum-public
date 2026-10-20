import { getRoleByUserId } from "@/shared/repositories/roles.repository.js";
import { unbanUser } from "./deleteTopicRole.repository.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";
import type { Topic, User } from "@/shared/types/domain/common.domain.js";

export default async function deleteTopicRoleService(
  topicId: Topic["topicId"], 
  targetUserId: User["userId"], actorUserId: User["userId"]
): Promise<void> {
  const [actorRole, targetRole] = await Promise.all([
    getRoleByUserId(actorUserId, topicId),
    getRoleByUserId(targetUserId, topicId)
  ]);

  switch (targetRole) {
    case "banned":
      if (actorRole !== "admin")
        throw new ClientError("Недостаточно прав", 403);

      await unbanUser(targetUserId, topicId);
      break;
  }
}