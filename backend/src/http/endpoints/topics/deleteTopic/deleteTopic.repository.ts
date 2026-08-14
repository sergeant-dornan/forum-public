import { pool } from "@/shared/config/db.js";
import type { TopicDB } from "@/shared/types/db.types.js";

export async function isTopicAuthor(
  userId: TopicDB["user_id"], topicId: TopicDB["topic_id"]
): Promise<boolean> {
  const result = await pool.query<{ exists: number }>(`
    SELECT 1 AS exists
    FROM topics
    WHERE user_id = $1 AND topic_id = $2;
  `, [userId, topicId]);
  return result.rows.length > 0;
}

export async function deleteTopic(
  topicId: TopicDB["topic_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM topics
    WHERE topic_id = $1
  `, [topicId])
}