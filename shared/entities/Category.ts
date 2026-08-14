import type { Category, Icon } from "../domain.types.js";

export type CategoryListItem = Category & Pick<Icon, "src" | "alt">;
