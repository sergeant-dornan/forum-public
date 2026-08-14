import { pool } from "@/shared/config/db.js";
import type { TopicDB } from "@/shared/types/db.types.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { MessageListItem } from "@forum/shared";

type MessageListItemDB = CamelToSnakeInterface<MessageListItem>;

export async function getMessages(
  topicId: TopicDB["topic_id"]
): Promise<MessageListItemDB[]> {
  const result = await pool.query<MessageListItemDB>(`
    SELECT 
      m.message_id,
      m.text_content,
      m.created_at, 
      u.user_id, 
      u.username, 
      i.src, 
      i.alt
    FROM messages m
    JOIN users u ON m.user_id = u.user_id
    JOIN icons i ON u.icon_id = i.icon_id
    WHERE m.topic_id = $1
    ORDER BY m.created_at ASC;  -- старые сообщения сверху, новые снизу
  `, [topicId]);
  return result.rows;
}

export async function getMessagesAfter(
  topicId: TopicDB["topic_id"], after: number
): Promise<MessageListItemDB[]> {
  const result = await pool.query<MessageListItemDB>(`
    SELECT 
      m.message_id,
      m.text_content,
      m.created_at, 
      u.user_id, 
      u.username, 
      i.src, 
      i.alt
    FROM messages m
    JOIN users u ON m.user_id = u.user_id
    JOIN icons i ON u.icon_id = i.icon_id
    WHERE m.topic_id = $1 AND m.message_id > $2
    ORDER BY m.created_at ASC;  -- старые сообщения сверху, новые снизу
  `, [topicId, after]);
  return result.rows;
}