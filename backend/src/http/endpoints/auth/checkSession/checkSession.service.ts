import type { UserSession } from "@forum/shared";
import { deleteUserSession, getUserIdBySessionId, updateUserSession } from "./checkSession.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";

export default async function checkSessionService(
  sessionId: UserSession["sessionId"]
): Promise<void> {
  // Получаем пользователя по айди сессии
  const userId = await getUserIdBySessionId(sessionId);
  if (userId === undefined) {
    // Удалим, на всякий случай
    await deleteUserSession(sessionId);
    throw new ClientError("Не аутентифицирован", 401);
  }
  else {
    await updateUserSession(sessionId);
  }
}