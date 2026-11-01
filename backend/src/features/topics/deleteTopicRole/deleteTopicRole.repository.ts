import { pool } from "@/shared/config/db.js";
import type { TopicDb } from "@/shared/types/db/common.db.js";

export async function unbanUser(
  userId: TopicDb["user_id"], topicId: TopicDb["topic_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM topic_roles 
    WHERE user_id = $1 AND topic_id = $2 AND role = $3;
  `, [userId, topicId, "banned"]);
}