import { pool } from "@/shared/config/db.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { Category, TopicListItem } from "@forum/shared";

type TopicListItemDB = CamelToSnakeInterface<TopicListItem>;

export async function searchTopics(
  q: string, categoryId?: Category["categoryId"]
): Promise<TopicListItemDB[]> {
  const words: string[] = q.trim().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return [];

  const conditions = words.map((_, index) => {
    return `(title ILIKE $${index + 1} OR description ILIKE $${index + 1})`
  }).join(" AND ");

  const params = words.map(word => `%${word}%`);

  if (categoryId) {
    const data = await pool.query<TopicListItemDB>(`
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
      WHERE status != 'hidden' AND ${conditions} AND category_id = $${params.length + 1} 
    `, [...params, categoryId]);
    return data.rows;
  } else {
    const data = await pool.query<TopicListItemDB>(`
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
      WHERE status != 'hidden' AND ${conditions} 
    `, params)
    return data.rows;
  }
}