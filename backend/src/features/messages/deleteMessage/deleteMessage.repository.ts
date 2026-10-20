import { pool } from "@/shared/config/db.js";
import type { MessageDb, TopicRoleDb, TopicDb } from "@/shared/types/db/common.db.js";

interface MessageDeletionValidation {
  status: TopicDb["status"];
  role: TopicRoleDb["role"] | "author" | null;
}

export async function getMessageDeletionPermissions(
  userId: MessageDb["user_id"], messageId: MessageDb["message_id"]
): Promise<MessageDeletionValidation | undefined> {
  const result = await pool.query<MessageDeletionValidation>(`
    SELECT
      t.status,
      CASE
        WHEN m.user_id = $1 THEN 'author'
        ELSE tr.role
      END as "role"
    FROM
      messages m
      JOIN topics t ON t.topic_id = m.topic_id
      LEFT JOIN topic_roles tr ON tr.user_id = $1 AND tr.topic_id = m.topic_id
    WHERE m.message_id = $2
  `, [userId, messageId]); 
  return result.rows[0];
}

export async function deleteMessage(
  messageId: MessageDb["message_id"]
): Promise<void> {
  await pool.query(`
    DELETE FROM messages
    WHERE message_id = $1
  `, [messageId]);
}