import { getUserRoles } from "@/shared/repositories/roles.repository.js";
import type { User } from "@/shared/types/domain/common.domain.js";
import type { UserRoleRecord } from "@/shared/types/domain/user.domain.js";

export default async function getUserRolesService(
  userId: User["userId"]
): Promise<UserRoleRecord> {
  const roles = await getUserRoles(userId);

  return roles;
}