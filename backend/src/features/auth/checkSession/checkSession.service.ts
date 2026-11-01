import type { UserSession } from "@/shared/types/domain/common.domain.js";
import { deleteUserSession, getUserIdBySessionId, updateUserSession } from "./checkSession.repository.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";

export default async function checkSessionService(
  sessionId: UserSession["sessionId"] | undefined
): Promise<void> {
  if (!sessionId) throw new ClientError("Не аутентифицирован", 401);
  
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