import { pool } from "@/shared/config/db.js";
import type { MessageDB, TopicDB } from "@/shared/types/db.types.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { MessageListItem } from "@forum/shared";

type MessageListItemDB = CamelToSnakeInterface<MessageListItem>

export async function getTopicStatus(
  topicId: TopicDB["topic_id"]
): Promise<TopicDB["status"] | undefined> {
  const result = await pool.query<Pick<TopicDB, "status">>(`
    SELECT status
    FROM topics
    WHERE topic_id = $1;
  `, [topicId]);
  return result.rows[0]?.status;
}

export async function createAndReturnMessage(
  topicId: MessageDB["topic_id"], userId: MessageDB["user_id"], message: MessageDB["text_content"]
): Promise<MessageListItemDB | undefined> {
  const result = await pool.query<MessageListItemDB>(`
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