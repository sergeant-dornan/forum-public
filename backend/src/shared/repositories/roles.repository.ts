import { pool } from "@/shared/config/db.js";
import type { TopicRoleDb, TopicDb, UserDb, UserSessionDb } from "@/shared/types/db/common.db.js";
import type { UserRoleRecord } from "@/shared/types/domain/user.domain.js";

type TopicRoleRow = Pick<TopicRoleDb, "topic_id" | "role">

export async function getRoleBySessionId(
  sessionId: UserSessionDb["session_id"], topicId: TopicDb["topic_id"]
): Promise<TopicRoleDb["role"] | undefined> {
  const result = await pool.query<Pick<TopicRoleDb, "role">>(`
    SELECT tr.role
    FROM user_sessions s JOIN topic_roles tr ON s.user_id = tr.user_id
    WHERE s.session_id = $1 AND tr.topic_id = $2 
  `, [sessionId, topicId]);
  return result.rows[0]?.role;
}

export async function getRoleByUserId(
  userId: UserDb["user_id"], topicId: TopicDb["topic_id"]
): Promise<TopicRoleDb["role"] | undefined> {
  const result = await pool.query<Pick<TopicRoleDb, "role">>(`
    SELECT role 
    FROM topic_roles 
    WHERE user_id = $1 AND topic_id = $2
  `, [userId, topicId]);
  return result.rows[0]?.role;
}

export async function getUserRoles(
  userId: UserDb["user_id"]
): Promise<UserRoleRecord> {
  const result = await pool.query<TopicRoleRow>(`
    SELECT 
      topic_id,
      role
    FROM topic_roles
    WHERE user_id = $1
  `, [userId]);

  // Преобразуем результат в объект где ключ - topicId, значение - role
  const roles: UserRoleRecord = result.rows.reduce<UserRoleRecord>((acc: UserRoleRecord, row) => {
    acc[row.topic_id] = row.role;
    return acc;
  }, {});

  return roles;
}
