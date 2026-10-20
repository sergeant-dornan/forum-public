import z from "zod";
import { TopicIdSchema, UserIdSchema } from "../../../schemas/common.dto.js";

export const RequestEventSchema = z.literal("topic:deleteRole");
export type RequestEvent = z.infer<typeof RequestEventSchema>;

export const RequestPayloadSchema = z.object({
  topicId: TopicIdSchema,
  targetUserId: UserIdSchema
});
export type RequestPayload = z.infer<typeof RequestPayloadSchema>;

export const RequestSchema = z.object({
  event: RequestEventSchema,
  payload: RequestPayloadSchema
});
export type Request = z.infer<typeof RequestSchema>;


export const ResponseEventSchema = z.literal("topic:roleDeleted");
export type ResponseEvent = z.infer<typeof ResponseEventSchema>;

export const ResponsePayloadSchema = z.object({
  userId: UserIdSchema,
  topicId: TopicIdSchema
});
export type ResponsePayload = z.infer<typeof ResponsePayloadSchema>;

export const ResponseSchema = z.object({
  event: ResponseEventSchema,
  payload: ResponsePayloadSchema
});
export type Response = z.infer<typeof ResponseSchema>;