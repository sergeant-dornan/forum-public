import type { CategoryListItem } from "@forum/shared";

export interface CategoryData {
  current: CategoryListItem | undefined;
  categoryIndex: number;
  categoriesCount: number;
};