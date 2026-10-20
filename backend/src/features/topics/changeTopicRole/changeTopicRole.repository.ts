import { pool } from "@/shared/config/db.js";
import type { TopicDb } from "@/shared/types/db/common.db.js";

export async function banUser(
  userId: TopicDb["user_id"], topicId: TopicDb["topic_id"]
): Promise<void> {
  await pool.query(`
    INSERT INTO topic_roles(user_id, topic_id, role)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, topic_id) 
    DO UPDATE SET 
      role = EXCLUDED.role
  `, [userId, topicId, "banned"]);
}