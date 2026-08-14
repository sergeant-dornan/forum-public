import { pool } from "@/shared/config/db.js";
import type { TopicDB } from "@/shared/types/db.types.js";

export async function banUser(
  userId: TopicDB["user_id"], topicId: TopicDB["topic_id"]
): Promise<void> {
  await pool.query(`
    INSERT INTO topic_roles(user_id, topic_id, role)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, topic_id) 
    DO UPDATE SET 
      role = EXCLUDED.role
  `, [userId, topicId, "banned"]);
}