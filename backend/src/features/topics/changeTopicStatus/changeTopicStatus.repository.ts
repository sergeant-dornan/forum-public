import { pool } from "@/shared/config/db.js";
import type { TopicDb } from "@/shared/types/db/common.db.js";

interface TopicStatusInfo {
  status: TopicDb["status"];
  topicsWithStatusCount: number;
}

export async function getTopicStatusInfo(
  userId: TopicDb["user_id"],
  topicId: TopicDb["topic_id"],
  status: TopicDb["status"]
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
  topicId: TopicDb["topic_id"],
  status: TopicDb["status"]
): Promise<TopicDb["status"] | undefined> {
  const result = await pool.query<Pick<TopicDb, "status">>(`
    UPDATE topics
    SET 
      status_changed_at = NOW(),
      status = $1
    WHERE topic_id = $2
    RETURNING status;
  `, [status, topicId]);
    return result.rows[0]?.status;
}