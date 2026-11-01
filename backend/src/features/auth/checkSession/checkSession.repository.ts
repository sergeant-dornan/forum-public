import { pool } from "@/shared/config/db.js";
import type { UserSessionDb } from "@/shared/types/db/common.db.js";

export async function getUserIdBySessionId(
  sessionId: UserSessionDb["session_id"]
): Promise<UserSessionDb["user_id"] | undefined> {
  const result = await pool.query<Pick<UserSessionDb, "user_id">>(`
    SELECT user_id
    FROM user_sessions
    WHERE session_id = $1 AND expires_at > NOW();
  `, [sessionId]);
  return result.rows[0]?.user_id;
}

export async function updateUserSession(
  sessionId: UserSessionDb["session_id"]
): Promise<void> {
  const newExpiresAt: Date = new Date(Date.now() + 7*24 * 60 * 60 * 1000);
  await pool.query(`
    UPDATE user_sessions
    SET expires_at = $1
    WHERE session_id = $2;
  `, [newExpiresAt, sessionId]);
}

export async function deleteUserSession(
  sessionId: UserSessionDb["session_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM user_sessions
    WHERE session_id = $1;
  `, [sessionId]);
}