import { pool } from "@/shared/config/db.js";
import type { UserSessionDB } from "@/shared/types/db.types.js";

export async function getUserIdBySessionId(
  sessionId: UserSessionDB["session_id"]
): Promise<UserSessionDB["user_id"] | undefined> {
  const result = await pool.query<Pick<UserSessionDB, "user_id">>(`
    SELECT user_id
    FROM user_sessions
    WHERE session_id = $1 AND expires_at > NOW();
  `, [sessionId]);
  return result.rows[0]?.user_id;
}

export async function updateUserSession(
  sessionId: UserSessionDB["session_id"]
): Promise<void> {
  const newExpiresAt: Date = new Date(Date.now() + 7*24 * 60 * 60 * 1000);
  await pool.query(`
    UPDATE user_sessions
    SET expires_at = $1
    WHERE session_id = $2;
  `, [newExpiresAt, sessionId]);
}

export async function deleteUserSession(
  sessionId: UserSessionDB["session_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM user_sessions
    WHERE session_id = $1;
  `, [sessionId]);
}