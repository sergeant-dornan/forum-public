import z from "zod";
import { TopicDetailsSchema } from "../../../schemas/topic.dto.js";
import { CategoryIdSchema } from "../../../schemas/common.dto.js";

export const ParamsSchema = z.object({}).optional();
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = TopicDetailsSchema;
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({
  title: z.string(),
  categoryId: CategoryIdSchema,
  description: z.string()
});
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({}).optional();
export type ReqQuery = z.infer<typeof ReqQuerySchema>;
