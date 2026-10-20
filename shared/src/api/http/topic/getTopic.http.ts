import z from "zod";
import { TopicDetailsSchema } from "../../../schemas/topic.dto.js";
import { TopicIdSchema } from "../../../schemas/common.dto.js";

export const ParamsSchema = z.object({
  topicId: TopicIdSchema
});
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = TopicDetailsSchema;
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({}).optional();
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({}).optional();
export type ReqQuery = z.infer<typeof ReqQuerySchema>;
