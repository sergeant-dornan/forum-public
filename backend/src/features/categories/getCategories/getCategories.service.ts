import { fromDb } from "@/shared/mappers/fromDb.mapper.js";
import { getCategories } from "./getCategories.repository.js";
import type { CategoryListItem } from "@/shared/types/domain/category.db.js";

export default async function getCategoriesService(): Promise<CategoryListItem[]> {
  const categories = fromDb(await getCategories())
  return categories;
}