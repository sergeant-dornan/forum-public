import z from "zod";
import { TopicListItemSchema } from "../../../schemas/topic.dto.js";
import { CategoryIdSchema } from "../../../schemas/common.dto.js";

export const ParamsSchema = z.object({}).optional();
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = z.array(TopicListItemSchema);
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({}).optional();
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({
  q: z.string(),
  categoryId: CategoryIdSchema.optional()
});
export type ReqQuery = z.infer<typeof ReqQuerySchema>;
