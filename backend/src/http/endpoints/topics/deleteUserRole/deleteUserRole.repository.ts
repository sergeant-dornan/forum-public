import { pool } from "@/shared/config/db.js";
import type { TopicDB } from "@/shared/types/db.types.js";

export async function unbanUser(
  userId: TopicDB["user_id"], topicId: TopicDB["topic_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM topic_roles 
    WHERE user_id = $1 AND topic_id = $2 AND role = $3;
  `, [userId, topicId, "banned"]);
}