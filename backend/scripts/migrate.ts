import { pool } from "../src/shared/config/db.ts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  const client = await pool.connect();
  
  try {
    // Начинаем транзакцию
    await client.query('BEGIN');
    
    // 1. Создаём таблицу миграций (если нет)
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    // 2. Получаем список уже выполненных
    const { rows: applied } = await client.query('SELECT name FROM migrations');
    const appliedNames = new Set(applied.map(row => row.name));
    
    // 3. Читаем файлы миграций из папки
    const migrationsDir = path.join(__dirname, "../migrations");
    
    if (!fs.existsSync(migrationsDir)) {
      throw new Error(`Directory not found: ${migrationsDir}`);
    }
    
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();
    
    if (files.length === 0) {
      console.log('Нет миграций для применения');
      await client.query('COMMIT');
      return;
    }
    
    // 4. Применяем новые
    for (const file of files) {
      if (appliedNames.has(file)) {
        console.log(`Пропускаем ${file} (уже выполнена)`);
        continue;
      }
      
      console.log(`Применяем ${file}...`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      try {
        await client.query(sql);
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
        console.log(`${file} выполнена`);
      } catch (err) {
        const error = err as Error;
        console.error(`Ошибка при выполнении ${file}:`, error.message);
        await client.query('ROLLBACK');
        throw error;
      }
    }
    
    // Фиксируем транзакцию
    await client.query('COMMIT');
    console.log('Все миграции успешно применены');
    
  } catch (error) {
    const err = error as Error;
    await client.query('ROLLBACK');
    console.error('Миграция прервана:', err.message);
    process.exit(1);
  } finally {
    client.release();
  }
}

// Запуск с обработкой ошибок
migrate().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});