import z from "zod";
import { MessageListItemSchema } from "../../../schemas/message.dto.js";
import { TopicIdSchema } from "../../../schemas/common.dto.js";

export const ParamsSchema = z.object({}).optional();
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = MessageListItemSchema;
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({
  message: z.string().trim(),
  topicId: TopicIdSchema,
});
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({}).optional();
export type ReqQuery = z.infer<typeof ReqQuerySchema>;