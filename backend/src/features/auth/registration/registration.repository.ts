import { pool } from "@/shared/config/db.js";
import type { UserDb } from "@/shared/types/db/common.db.js";

export async function isNewUser(
  email: UserDb["email"], phone: UserDb["phone"]
): Promise<boolean> {
  const result = await pool.query<{ exists: number }>(`
    SELECT 1 AS exists FROM users 
    WHERE email = $1 OR phone = $2;
  `, [email, phone]);
  return result.rows.length === 0;
}

export async function isNewLogin(
  username: UserDb["username"]
): Promise<boolean> {
  const result = await pool.query<{ exists: number }>(`
    SELECT 1 AS exists FROM users
    WHERE username = $1;
    `, [username]);
  return result.rows.length === 0;
}

export async function insertUserAndReturnId(
  username: UserDb["username"], phone: UserDb["phone"],
  email: UserDb["email"], passwordHash: UserDb["password_hash"]
): Promise<UserDb["user_id"] | undefined> {
  const result = await pool.query<Pick<UserDb, "user_id">>(`
    INSERT INTO users (username, phone, email, password_hash) 
    VALUES ($1, $2, $3, $4)
    RETURNING user_id;
  `, [username, phone, email, passwordHash]);
  return result.rows[0]?.user_id;
}