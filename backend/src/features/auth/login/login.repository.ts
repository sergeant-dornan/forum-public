import { pool } from "@/shared/config/db.js";
import type { UserDb } from "@/shared/types/db/common.db.js";

export async function getUserDataByUsername(
  username: UserDb["username"]
): Promise<Pick<UserDb, "user_id" | "password_hash"> | undefined> {
  const result = await pool.query<Pick<UserDb, "user_id" | "password_hash">>(`
    SELECT user_id, password_hash
    FROM users
    WHERE username = $1;
  `, [username]);
  return result.rows[0];
}