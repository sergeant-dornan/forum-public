import type { Category, Icon } from "./common.domain.js";

export type CategoryListItem = Category & Pick<Icon, "src" | "alt">;