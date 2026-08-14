import { getUserRoles } from "@/shared/repositories/roles.repository.js";
import type { User, UserRole } from "@forum/shared";

export default async function getUserRolesService(
  userId: User["userId"]
): Promise<UserRole> {
  const roles = await getUserRoles(userId);

  return roles;
}