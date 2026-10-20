import z from "zod";
import { MessageIdSchema, TopicIdSchema } from "../../../schemas/common.dto.js";

export const RequestEventSchema = z.literal("message:delete");
export type RequestEvent = z.infer<typeof RequestEventSchema>;

export const RequestPayloadSchema = z.object({
  topicId: TopicIdSchema,
  messageId: MessageIdSchema
});
export type RequestPayload = z.infer<typeof RequestPayloadSchema>;

export const RequestSchema = z.object({
  event: RequestEventSchema,
  payload: RequestPayloadSchema
});
export type Request = z.infer<typeof RequestSchema>;


export const ResponseEventSchema = z.literal("message:deleted");
export type ResponseEvent = z.infer<typeof ResponseEventSchema>;

export const ResponsePayloadSchema = z.object({
  topicId: TopicIdSchema,
  messageId: MessageIdSchema
});
export type ResponsePayload = z.infer<typeof ResponsePayloadSchema>;

export const ResponseSchema = z.object({
  event: ResponseEventSchema,
  payload: ResponsePayloadSchema
});
export type Response = z.infer<typeof ResponseSchema>;