import { pool } from "@/shared/config/db.js";
import type { UserDb } from "@/shared/types/db/common.db.js";
import type { TopicListItemDb } from "@/shared/types/db/topic.db.js";

export async function getTopicsBySessionId(
  userId: UserDb["user_id"]
): Promise<TopicListItemDb[]> {
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
    WHERE user_id = $1
    ORDER BY status_changed_at DESC, created_at ASC;
  `, [userId]);
  return result.rows;
}