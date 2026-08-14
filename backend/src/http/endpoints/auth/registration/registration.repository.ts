import { pool } from "@/shared/config/db.js";
import type { UserDB } from "@/shared/types/db.types.js";

export async function isNewUser(
  email: UserDB["email"], phone: UserDB["phone"]
): Promise<boolean> {
  const result = await pool.query<{ exists: number }>(`
    SELECT 1 AS exists FROM users 
    WHERE email = $1 OR phone = $2;
  `, [email, phone]);
  return result.rows.length === 0;
}

export async function isNewLogin(
  username: UserDB["username"]
): Promise<boolean> {
  const result = await pool.query<{ exists: number }>(`
    SELECT 1 AS exists FROM users
    WHERE username = $1;
    `, [username]);
  return result.rows.length === 0;
}

export async function insertUserAndReturnId(
  username: UserDB["username"], phone: UserDB["phone"],
  email: UserDB["email"], passwordHash: UserDB["password_hash"]
): Promise<UserDB["user_id"] | undefined> {
  const result = await pool.query<Pick<UserDB, "user_id">>(`
    INSERT INTO users (username, phone, email, password_hash) 
    VALUES ($1, $2, $3, $4)
    RETURNING user_id;
  `, [username, phone, email, passwordHash]);
  return result.rows[0]?.user_id;
}