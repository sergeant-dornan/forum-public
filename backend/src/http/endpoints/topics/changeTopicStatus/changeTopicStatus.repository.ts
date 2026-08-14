import { pool } from "@/shared/config/db.js";
import type { TopicDB } from "@/shared/types/db.types.js";

interface TopicStatusInfo {
  status: TopicDB["status"];
  topicsWithStatusCount: number;
}

export async function getTopicStatusInfo(
  userId: TopicDB["user_id"],
  topicId: TopicDB["topic_id"],
  status: TopicDB["status"]
): Promise<TopicStatusInfo | undefined> {
  const result = await pool.query<TopicStatusInfo>(`
    SELECT 
      t.status,
      (SELECT COUNT(*) FILTER (WHERE status = $1) 
       FROM topics 
       WHERE user_id = t.user_id) AS "topicsWithStatusCount"
    FROM topics t
    WHERE 
      t.user_id = $2
      AND t.topic_id = $3;
  `, [status, userId, topicId]);
  return result.rows[0];
}

export async function updateTopicStatus(
  topicId: TopicDB["topic_id"],
  status: TopicDB["status"]
): Promise<TopicDB["status"] | undefined> {
  const result = await pool.query<Pick<TopicDB, "status">>(`
    UPDATE topics
    SET 
      status_changed_at = NOW(),
      status = $1
    WHERE topic_id = $2
    RETURNING status;
  `, [status, topicId]);
    return result.rows[0]?.status;
}