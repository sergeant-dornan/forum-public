import { pool } from "@/shared/config/db.js";
import type { UserDB } from "@/shared/types/db.types.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { TopicListItem } from "@forum/shared";

type TopicListItemDB = CamelToSnakeInterface<TopicListItem>;

export async function getTopicsBySessionId(
  userId: UserDB["user_id"]
): Promise<TopicListItemDB[]> {
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
    WHERE user_id = $1
    ORDER BY status_changed_at DESC, created_at ASC;
  `, [userId]);
  return result.rows;
}