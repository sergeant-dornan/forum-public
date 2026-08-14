import { pool } from "@/shared/config/db.js";
import type { TopicRoleDB, TopicDB } from "@/shared/types/db.types.js";

export async function getTopicRoles(
  topicId: TopicDB["topic_id"]
): Promise<Pick<TopicRoleDB, "user_id" | "role">[]> {
  const result = await pool.query<Pick<TopicRoleDB, "user_id" | "role">>(`
    SELECT user_id, role
    FROM topic_roles 
    WHERE topic_id = $1
  `, [topicId]);
  return result.rows;
}
