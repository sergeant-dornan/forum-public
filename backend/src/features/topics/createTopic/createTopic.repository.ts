import { pool } from "@/shared/config/db.js";
import type { TopicDb } from "@/shared/types/db/common.db.js";
import type { TopicDetailsDb } from "@/shared/types/db/topic.db.js";

interface TopicsCount {
  openTopicsCount: number;
  topicsCount: number;
}

export async function getUserTopicsCounts(
  userId: TopicDb["user_id"]
): Promise<TopicsCount | undefined> {
  const result = await pool.query<TopicsCount>(`
    SELECT
      COUNT(*) FILTER (WHERE status = 'open') AS "openTopicsCount",
      COUNT(*) AS "topicsCount"
    FROM topics
    WHERE user_id = $1;
  `, [userId]);
  return result.rows[0];
}

export async function createAndReturnTopic(
  title: TopicDb["title"], categoryId: TopicDb["category_id"],
  userId: TopicDb["user_id"], description: TopicDb["description"]
): Promise<TopicDetailsDb | undefined> {
  const client = await pool.connect();
  try {
    // Начало транзации
    await client.query("BEGIN");

    // 1. Создаем тему
    const insertResult = await client.query<Pick<TopicDb, "topic_id">>(`
      INSERT INTO topics(title, category_id, user_id, description)
      VALUES ($1, $2, $3, $4)
      RETURNING topic_id
    `, [title, categoryId, userId, description]);
    const newTopicId = insertResult.rows[0]?.topic_id;
    if (newTopicId === undefined)
      throw new Error("topicId - undefined");

    // 2. Устанавливаем роль админа
    await client.query(`
      INSERT INTO topic_roles(user_id, topic_id, role)
      VALUES($1, $2, 'admin') 
      ON CONFLICT (user_id, topic_id) 
        DO UPDATE SET role = EXCLUDED.role
    `, [userId, newTopicId]);

    // 3. Получаем созданную тему
    const result = await client.query<TopicDetailsDb>(`
      SELECT 
        t.category_id,
        t.topic_id, 
        t.user_id, 
        t.title, 
        t.created_at, 
        t.status_changed_at, 
        t.description, 
        t.status,
        c.title as category_title,
        u.username,
        i.src,
        i.alt
      FROM topics t
        JOIN categories c ON t.category_id = c.category_id
        JOIN users u ON t.user_id = u.user_id
        JOIN icons i ON i.icon_id = u.icon_id
      WHERE t.topic_id = $1
    `, [newTopicId])

    // Конец транзакции
    await client.query('COMMIT');

    return result.rows[0];
  }
  catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка создания темы:', error);
    throw error;
  } 
  finally {
    client.release();
  }
}