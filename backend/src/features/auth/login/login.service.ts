import { getUserDataByUsername } from "./login.repository.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";
import { compare } from "bcrypt";
import { createSession, createUserState } from "@/shared/utils/authUtils/authUtils.js";
import type { User, UserSession } from "@/shared/types/domain/common.domain.js";
import type { UserState } from "@/shared/types/domain/user.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function loginService(
  username: User["username"], password: string, ipAddress: string
): Promise<{ sessionId: UserSession["sessionId"], user: UserState }> {
  const userData = fromDb(await getUserDataByUsername(username));
  if (userData === undefined)
    throw new ClientError("Пользователь не найден", 404);

  // Проверка пароля
  if (!(await compare(password, userData.passwordHash)))
    throw new ClientError("Неверный пароль", 401);

  // Создаем сессию и получаем объект пользователя
  const userId = userData.userId;

  const sessionId: UserSession["sessionId"] = await createSession(userId, ipAddress);
  const user: UserState = await createUserState(userId, username);

  return { sessionId, user }
}