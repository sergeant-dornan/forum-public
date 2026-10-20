import dotenv from "dotenv";
import { Pool, types } from 'pg';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3
});

// Целые числа возвращаются, как строки
types.setTypeParser(types.builtins.INT2, (v) => v);
types.setTypeParser(types.builtins.INT4, (v) => v);
types.setTypeParser(types.builtins.INT8, (v) => v);