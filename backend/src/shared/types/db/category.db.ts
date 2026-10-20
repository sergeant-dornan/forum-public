import type { ToDbType } from "@/shared/mappers/toDb.mapper.js";
import type { CategoryListItem } from "../domain/category.db.js";

export type CategoryListItemDb = ToDbType<CategoryListItem>;