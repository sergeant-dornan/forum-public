import { pool } from "@/shared/config/db.js";
import type { TopicDb } from "@/shared/types/db/common.db.js";
import type { TopicDetailsDb } from "@/shared/types/db/topic.db.js";

export async function getTopic(
  topicId: TopicDb["topic_id"]
): Promise<TopicDetailsDb | undefined> {
  const result = await pool.query<TopicDetailsDb>(`
    SELECT 
      c.title AS category_title,
      t.category_id,
      t.topic_id,
      t.user_id,
      t.title, 
      t.status,
      t.status_changed_at, 
      t.created_at, 
      t.description,
      u.username, 
      i.src, 
      i.alt
    FROM topics t 
    JOIN categories c ON t.category_id = c.category_id
    JOIN users u ON t.user_id = u.user_id
    JOIN icons i ON u.icon_id = i.icon_id
    WHERE t.topic_id = $1;
  `, [topicId]);
  return result.rows[0];
}