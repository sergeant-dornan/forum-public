import { pool } from "@/shared/config/db.js";
import type { MessageDb, TopicDb } from "@/shared/types/db/common.db.js";
import type { MessageListItemDb } from "@/shared/types/db/message.db.js";

export async function getTopicStatus(
  topicId: TopicDb["topic_id"]
): Promise<TopicDb["status"] | undefined> {
  const result = await pool.query<Pick<TopicDb, "status">>(`
    SELECT status
    FROM topics
    WHERE topic_id = $1;
  `, [topicId]);
  return result.rows[0]?.status;
}

export async function createAndReturnMessage(
  topicId: MessageDb["topic_id"], userId: MessageDb["user_id"], message: MessageDb["text_content"]
): Promise<MessageListItemDb | undefined> {
  const result = await pool.query<MessageListItemDb>(`
    WITH inserted AS (
      INSERT INTO messages (topic_id, user_id, text_content)
      VALUES ($1, $2, $3)
      RETURNING message_id, user_id, text_content, created_at
    )
    SELECT 
      m.message_id,
      m.text_content,
      m.created_at,
      m.user_id,
      u.username,
      i.src,
      i.alt
    FROM inserted m
      JOIN users u ON m.user_id = u.user_id
      JOIN icons i ON u.icon_id = i.icon_id
  `, [topicId, userId, message]);
  return result.rows[0];
}