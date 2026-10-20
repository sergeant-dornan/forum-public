import type { User } from "@/shared/types/domain/common.domain.js";
import type { UserState } from "@/shared/types/domain/user.domain.js";
import { getUserState } from "@/shared/utils/authUtils/authUtils.js";

export default async function getMeService(userId: User["userId"]): Promise<UserState> {
  const me = await getUserState(userId);

  return me;
}