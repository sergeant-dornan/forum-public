import { pool } from "@/shared/config/db.js";
import type { TopicDB } from "@/shared/types/db.types.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { TopicDetails } from "@forum/shared";

type TopicDetailsDB = CamelToSnakeInterface<TopicDetails>;

export async function getTopic(
  topicId: TopicDB["topic_id"]
): Promise<TopicDetailsDB | undefined> {
  const result = await pool.query<TopicDetailsDB>(`
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