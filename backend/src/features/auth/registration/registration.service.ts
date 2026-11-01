import bcrypt from "bcrypt";
import { insertUserAndReturnId, isNewLogin, isNewUser } from "./registration.repository.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";
import { createSession, createUserState } from "@/shared/utils/authUtils/authUtils.js";
import type { User, UserSession } from "@/shared/types/domain/common.domain.js";
import type { UserState } from "@/shared/types/domain/user.domain.js";

export default async function registrationService(
  username: User["username"], password: string, email: User["email"], phone: User["phone"], ipAddress: string
): Promise<{ sessionId: UserSession["sessionId"], user: UserState }> {
  if ((await isNewUser(email, phone)) === false)
    throw new ClientError("Данный телефон (или email) уже зарегистрирован", 409);
  if ((await isNewLogin(username) === false))
    throw new ClientError("Имя занято. Войдите под другим логином", 409);

  // Хешируем пароль
  const passwordHash: User["passwordHash"] = await bcrypt.hash(password, 10);

  // Добавляем данные и получаем айди
  const userId = await insertUserAndReturnId(username, phone, email, passwordHash);
  if (userId === undefined) {
    throw new Error("userId - undefined")
  }

  // Создаем сессию и получаем объект пользователя
  const sessionId: string = await createSession(userId, ipAddress);
  const user: UserState = await createUserState(userId, username);

  return { sessionId, user }
}