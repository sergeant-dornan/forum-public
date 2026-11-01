import { pool } from "@/shared/config/db.js";
import type { CategoryListItemDb } from "@/shared/types/db/category.db.js";

export async function getCategories(): Promise<CategoryListItemDb[]> {
  const result = await pool.query<CategoryListItemDb>(`
    SELECT
      c.category_id,
      c.title,
      c.description,
      c.icon_id, 
      i.src,
      i.alt
    FROM categories c JOIN icons i USING(icon_id);
  `);
  return result.rows;
}