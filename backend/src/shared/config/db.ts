import dotenv from "dotenv";
import { Pool, types } from 'pg';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3
});

// Заставляем BIGINT возвращаться как number
types.setTypeParser(types.builtins.INT8, (value: string) => {
  const num = parseInt(value, 10);
  // Если значение в безопасном диапазоне, возвращаем number
  if (num <= Number.MAX_SAFE_INTEGER) {
    return num;
  }
  // Иначе оставляем как строку
  return value;
});