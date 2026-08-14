import { pool } from "@/shared/config/db.js";
import type { TopicRoleDB, TopicDB, UserDB, UserSessionDB } from "@/shared/types/db.types.js";
import type { UserRole } from "@forum/shared";

type TopicRoleRow = Pick<TopicRoleDB, "topic_id" | "role">

export async function getRoleBySessionId(
  sessionId: UserSessionDB["session_id"], topicId: TopicDB["topic_id"]
): Promise<TopicRoleDB["role"] | undefined> {
  const result = await pool.query<Pick<TopicRoleDB, "role">>(`
    SELECT tr.role
    FROM user_sessions s JOIN topic_roles tr ON s.user_id = tr.user_id
    WHERE s.session_id = $1 AND tr.topic_id = $2 
  `, [sessionId, topicId]);
  return result.rows[0]?.role;
}

export async function getRoleByUserId(
  userId: UserDB["user_id"], topicId: TopicDB["topic_id"]
): Promise<TopicRoleDB["role"] | undefined> {
  const result = await pool.query<Pick<TopicRoleDB, "role">>(`
    SELECT role 
    FROM topic_roles 
    WHERE user_id = $1 AND topic_id = $2
  `, [userId, topicId]);
  return result.rows[0]?.role;
}

export async function getUserRoles(
  userId: UserDB["user_id"]
): Promise<UserRole> {
  const result = await pool.query<TopicRoleRow>(`
    SELECT 
      topic_id,
      role
    FROM topic_roles
    WHERE user_id = $1
  `, [userId]);

  // Преобразуем результат в объект где ключ - topicId, значение - role
  const roles: UserRole = result.rows.reduce<UserRole>((acc: UserRole, row) => {
    acc[row.topic_id] = row.role;
    return acc;
  }, {});

  return roles;
}
