import type { UserSession } from "@forum/shared";
import { deleteUserSession } from "./logout.repository.js";

export default async function logoutService(
  sessionId: UserSession["sessionId"]
): Promise<void> {
  await deleteUserSession(sessionId);
}