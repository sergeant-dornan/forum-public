import type { UserSession } from "@/shared/types/domain/common.domain.js";
import { deleteUserSession } from "./logout.repository.js";

export default async function logoutService(
  sessionId: UserSession["sessionId"] | undefined
): Promise<void> {
  if (!sessionId) return;
  await deleteUserSession(sessionId);
}