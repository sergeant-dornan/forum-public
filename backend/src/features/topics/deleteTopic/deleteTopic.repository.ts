import { pool } from "@/shared/config/db.js";
import type { TopicDb } from "@/shared/types/db/common.db.js";

export async function isTopicAuthor(
  userId: TopicDb["user_id"], topicId: TopicDb["topic_id"]
): Promise<boolean> {
  const result = await pool.query<{ exists: number }>(`
    SELECT 1 AS exists
    FROM topics
    WHERE user_id = $1 AND topic_id = $2;
  `, [userId, topicId]);
  return result.rows.length > 0;
}

export async function deleteTopic(
  topicId: TopicDb["topic_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM topics
    WHERE topic_id = $1
  `, [topicId])
}