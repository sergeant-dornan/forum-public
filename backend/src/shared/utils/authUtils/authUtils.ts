import { randomBytes } from "crypto";

import type { Request } from "express";
import { getUsername, insertSession } from "./authUtils.repository.js";
import { getUserRoles } from "@/shared/repositories/roles.repository.js";
import type { User } from "@/shared/types/domain/common.domain.js";
import type { UserState } from "@/shared/types/domain/user.domain.js";
import type { IncomingMessage } from "http";

// Создает сессию
export async function createSession(userId: User["userId"], ipAddress: string): Promise<string> {
  const sessionId: string = randomBytes(64).toString("hex");
  const expiresAt: Date = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await insertSession(sessionId, userId, expiresAt, ipAddress);

  return sessionId;
}

// Достает сессию из куки
export function getSessionId(req: Request | IncomingMessage) {
  // Беру сессию из headers
  const sessionId = req.headers.cookie
    ?.split("; ")
    .find((row: string) => row.startsWith("session="))
    ?.split("=")[1];

  return sessionId;
}

// Создает объект пользователя
export async function createUserState(
  userId: User["userId"], username: User["username"]
): Promise<UserState> {
  const roles = await getUserRoles(userId);

  const user: UserState = { userId, username, roles }

  return user;
}

// Создает объект пользователя
export async function getUserState(
  userId: User["userId"]
): Promise<UserState> {
  const [username, roles] = await Promise.all([
    getUsername(userId),
    getUserRoles(userId)
  ]);
  if (username === undefined) throw new Error("username - undefined");

  const user: UserState = { userId, username, roles }

  return user;
}