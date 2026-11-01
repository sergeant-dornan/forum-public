import { pool } from "@/shared/config/db.js";
import type { TopicListItemDb } from "@/shared/types/db/topic.db.js";

export async function getTopics(): Promise<TopicListItemDb[]> {
  const result = await pool.query<TopicListItemDb>(`
    SELECT 
      topic_id,
      category_id,
      user_id,
      title,
      created_at,
      status_changed_at,
      description,
      status
    FROM topics
    ORDER BY created_at ASC;
  `);
  return result.rows;
}