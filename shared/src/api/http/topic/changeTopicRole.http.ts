import z from "zod";
import { TopicIdSchema, TopicRoleSchema, UserIdSchema } from "../../../schemas/common.dto.js";

export const ParamsSchema = z.object({
  topicId: TopicIdSchema
});
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = TopicRoleSchema;
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({
  newRole: TopicRoleSchema,
  targetUserId: UserIdSchema
});
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({}).optional();
export type ReqQuery = z.infer<typeof ReqQuerySchema>;