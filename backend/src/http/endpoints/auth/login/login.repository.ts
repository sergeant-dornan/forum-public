import { pool } from "@/shared/config/db.js";
import type { UserDB } from "@/shared/types/db.types.js";

export async function getUserDataByUsername(
  username: UserDB["username"]
): Promise<Pick<UserDB, "user_id" | "password_hash"> | undefined> {
  const result = await pool.query<Pick<UserDB, "user_id" | "password_hash">>(`
    SELECT user_id, password_hash
    FROM users
    WHERE username = $1;
  `, [username]);
  return result.rows[0];
}