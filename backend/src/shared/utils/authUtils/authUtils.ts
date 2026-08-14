import { randomBytes } from "crypto";

import type { Request } from "express";
import { ClientError } from "../ClientError.js";
import { insertSession } from "./authUtils.repository.js";
import { getUserRoles } from "@/shared/repositories/roles.repository.js";
import type { User, UserContext, UserSession } from "@forum/shared";

// Создает сессию
export async function createSession(userId: User["userId"], ipAddress: string): Promise<string> {
  const sessionId: string = randomBytes(64).toString("hex");
  const expiresAt: Date = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await insertSession(sessionId, userId, expiresAt, ipAddress);

  return sessionId;
}

// Достает сессию из куки
export function getSessionId(req: Request): UserSession["sessionId"] {
  // Беру сессию из headers
  const sessionId = req.headers.cookie
    ?.split("; ")
    .find((row) => row.startsWith("session="))
    ?.split("=")[1];

  if (sessionId === undefined)
    throw new ClientError("Не аутентифицирован", 401);

  return sessionId;
}

// Создает объект для контекста пользователя
export async function createUser(
  userId: User["userId"], username: User["username"]
): Promise<UserContext> {
  // Получаем пользовательские роли для контекста
  const roles = await getUserRoles(userId);

  // Хранится в контексте на фронтенде
  const user: UserContext = { userId, username, roles }

  return user;
}