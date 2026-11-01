import { pool } from "@/shared/config/db.js";
import type { CategoryDb } from "@/shared/types/db/common.db.js";
import type { TopicListItemDb } from "@/shared/types/db/topic.db.js";

export async function searchTopics(
  q: string, categoryId?: CategoryDb["category_id"]
): Promise<TopicListItemDb[]> {
  const words: string[] = q.trim().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return [];

  const conditions = words.map((_, index) => {
    return `(title ILIKE $${index + 1} OR description ILIKE $${index + 1})`
  }).join(" AND ");

  const params = words.map(word => `%${word}%`);

  if (categoryId) {
    const data = await pool.query<TopicListItemDb>(`
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
    const data = await pool.query<TopicListItemDb>(`
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