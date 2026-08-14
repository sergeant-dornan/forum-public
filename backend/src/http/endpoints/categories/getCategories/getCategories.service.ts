import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";
import { getCategories } from "./getCategories.repository.js";
import type { CategoryListItem } from "@forum/shared";

export default async function getCategoriesService(): Promise<CategoryListItem[]> {
  const categories = snakeToCamel(await getCategories())
  return categories;
}