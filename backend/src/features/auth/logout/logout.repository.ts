import { pool } from "@/shared/config/db.js";
import type { UserSessionDb } from "@/shared/types/db/common.db.js";

export async function deleteUserSession(
  sessionId: UserSessionDb["session_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM user_sessions WHERE session_id = $1;
  `, [sessionId]);
}