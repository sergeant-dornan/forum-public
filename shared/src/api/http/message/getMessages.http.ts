import z from "zod";
import { TopicIdSchema } from "../../../schemas/common.dto.js";
import { MessageListItemSchema } from "../../../schemas/message.dto.js";

export const ParamsSchema = z.object({
  topicId: TopicIdSchema
});
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = z.array(MessageListItemSchema);
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({}).optional();
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({
  after: z.string().optional()
});
export type ReqQuery = z.infer<typeof ReqQuerySchema>;