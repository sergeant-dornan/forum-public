import z from "zod";
import { CategoryIdSchema, IconIdSchema } from "./common.dto.js";

export const CategoryListItemSchema = z.object({
  categoryId: CategoryIdSchema,
  iconId: IconIdSchema,
  title: z.string(),
  description: z.string(),
  src: z.string(),
  alt: z.string()
});
export type CategoryListItem = z.infer<typeof CategoryListItemSchema>;