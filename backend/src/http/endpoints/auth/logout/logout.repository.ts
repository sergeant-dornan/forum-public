import { pool } from "@/shared/config/db.js";
import type { UserSessionDB } from "@/shared/types/db.types.js";

export async function deleteUserSession(
  sessionId: UserSessionDB["session_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM user_sessions WHERE session_id = $1;
  `, [sessionId]);
}