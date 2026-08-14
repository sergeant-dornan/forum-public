import { pool } from "@/shared/config/db.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { TopicListItem } from "@forum/shared";

type TopicListItemDB = CamelToSnakeInterface<TopicListItem>;

export async function getTopics(): Promise<TopicListItemDB[]> {
  const result = await pool.query<TopicListItemDB>(`
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