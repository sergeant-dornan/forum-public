import { pool } from "@/shared/config/db.js";
import type { CamelToSnakeInterface } from "@/shared/utils/changeCaseUtils.js";
import type { CategoryListItem } from "@forum/shared";

type CategoryListItemDB = CamelToSnakeInterface<CategoryListItem>;

export async function getCategories(): Promise<CamelToSnakeInterface<CategoryListItemDB>[]> {
  const result = await pool.query<CamelToSnakeInterface<CategoryListItemDB>>(`
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