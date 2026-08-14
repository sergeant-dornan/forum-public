import { getUserDataByUsername } from "./login.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";
import { compare } from "bcrypt";
import { createSession, createUser } from "@/shared/utils/authUtils/authUtils.js";
import type { User, UserContext, UserSession } from "@forum/shared";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function loginService(
  username: User["username"], password: string, ipAddress: string
): Promise<{ sessionId: UserSession["sessionId"], user: UserContext }> {
  const userData = snakeToCamel(await getUserDataByUsername(username));
  if (userData === undefined) {
    throw new ClientError("Пользователь не найден", 404);
  }

  // Проверка пароля
  if (!(await compare(password, userData.passwordHash))) {
    throw new ClientError("Неверный пароль", 401)
  }

  // Создаем сессию и получаем объект пользователя
  const userId = userData.userId;

  const sessionId: UserSession["sessionId"] = await createSession(userId, ipAddress);
  const user: UserContext = await createUser(userId, username);

  return { sessionId, user }
}