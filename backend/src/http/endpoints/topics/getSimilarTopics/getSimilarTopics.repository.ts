import { pool } from "@/shared/config/db.js";
import type { TopicDB } from "@/shared/types/db.types.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { TopicListItem } from "@forum/shared";

type TopicListItemDB = CamelToSnakeInterface<TopicListItem>;

export async function getSimilarTopics(
  topicId: TopicListItemDB["topic_id"]
): Promise<TopicListItemDB[]> {
  // Проверка существования темы
  const topicExists = await pool.query<Pick<TopicDB, "search_vector">>(`
    SELECT search_vector FROM topics WHERE topic_id = $1
  `, [topicId]
  );

  if (topicExists.rows.length === 0) {
    return [];
  }

  const result = await pool.query<TopicListItemDB>(`
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