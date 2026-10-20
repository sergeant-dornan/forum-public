import { getRoleByUserId } from "@/shared/repositories/roles.repository.js";
import { banUser } from "./changeTopicRole.repository.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";
import type { Topic, TopicRole, User } from "@/shared/types/domain/common.domain.js";

export default async function changeTopicRoleService(
  topicId: Topic["topicId"], newRole: TopicRole["role"],
  targetUserId: User["userId"], actorUserId: User["userId"]
) {
  const [actorRole, targetRole] = await Promise.all([
    getRoleByUserId(actorUserId, topicId),
    getRoleByUserId(targetUserId, topicId)
  ]);

  switch (newRole) {
    case "banned":
      if (targetRole === "banned")
        throw new ClientError("Пользователь уже забанен", 409);
      if (actorRole !== "admin" || targetRole === "admin")
        throw new ClientError("Недостаточно прав", 403);

      await banUser(targetUserId, topicId);
      break;
  }

  return newRole;
}