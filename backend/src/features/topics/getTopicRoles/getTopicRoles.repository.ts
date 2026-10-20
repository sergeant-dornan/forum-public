import { pool } from "@/shared/config/db.js";
import type { TopicRoleDb, TopicDb } from "@/shared/types/db/common.db.js";

export async function getTopicRoles(
  topicId: TopicDb["topic_id"]
): Promise<Pick<TopicRoleDb, "user_id" | "role">[]> {
  const result = await pool.query<Pick<TopicRoleDb, "user_id" | "role">>(`
    SELECT user_id, role
    FROM topic_roles 
    WHERE topic_id = $1
  `, [topicId]);
  return result.rows;
}
