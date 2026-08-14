import { pool } from "@/shared/config/db.js";
import type { UserSessionDB } from "@/shared/types/db.types.js";

export async function insertSession(
  sessionId: UserSessionDB["session_id"], userId: UserSessionDB["user_id"], expiresAt: Date, ipAddress: string
): Promise<void> {
  await pool.query(`
    INSERT INTO user_sessions (session_id, user_id, expires_at, ip_address)
    VALUES ($1, $2, $3, $4);
    `, [sessionId, userId, expiresAt, ipAddress]
  );
}

