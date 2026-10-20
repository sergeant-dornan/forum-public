import { pool } from "@/shared/config/db.js";
import type { UserDb, UserSessionDb } from "@/shared/types/db/common.db.js";

export async function insertSession(
  sessionId: UserSessionDb["session_id"], userId: UserSessionDb["user_id"], expiresAt: Date, ipAddress: string
): Promise<void> {
  await pool.query(`
    INSERT INTO user_sessions (session_id, user_id, expires_at, ip_address)
    VALUES ($1, $2, $3, $4);
    `, [sessionId, userId, expiresAt, ipAddress]
  );
}

export async function getUsername(
  userId: UserDb["user_id"]
): Promise<UserDb["username"] | undefined> {
  const result = await pool.query<Pick<UserDb, "username">>(`
    SELECT username 
    FROM users 
    WHERE user_id = $1
  `, [userId]);

  return result.rows[0]?.username;
}