import { pool } from "@/shared/config/db.js";
import type { TopicDb } from "@/shared/types/db/common.db.js";
import type { TopicListItemDb } from "@/shared/types/db/topic.db.js";

export async function getSimilarTopics(
  topicId: TopicListItemDb["topic_id"]
): Promise<TopicListItemDb[]> {
  // Проверка существования темы
  const topicExists = await pool.query<Pick<TopicDb, "search_vector">>(`
    SELECT search_vector FROM topics WHERE topic_id = $1
  `, [topicId]
  );

  if (topicExists.rows.length === 0) {
    return [];
  }

  const result = await pool.query<TopicListItemDb>(`
    WITH target_query AS (
      SELECT to_tsquery('russian', 
        string_agg(lexeme, '|')
      ) AS query
      FROM unnest(tsvector_to_array((SELECT search_vector FROM topics WHERE topic_id = $1))) AS lexeme
      WHERE length(lexeme) > 1
    )
    SELECT 
      t.topic_id,
      t.category_id,
      t.user_id,
      t.title,
      t.created_at,
      t.status_changed_at,
      t.description,
      t.status
    FROM topics t, target_query q
    WHERE 
      t.topic_id != $1
      AND t.status != 'hidden'
      AND q.query IS NOT NULL
      AND t.search_vector @@ q.query
    ORDER BY ts_rank(t.search_vector, q.query) DESC
    LIMIT 5;
  `, [topicId]);

  return result.rows;
}