import z from "zod";
import { TopicIdSchema, TopicStatusSchema } from "../../../schemas/common.dto.js";

export const RequestEventSchema = z.literal("topic:changeStatus");
export type RequestEvent = z.infer<typeof RequestEventSchema>;

export const RequestPayloadSchema = z.object({
  topicId: TopicIdSchema,
  status: TopicStatusSchema
});
export type RequestPayload = z.infer<typeof RequestPayloadSchema>;

export const RequestSchema = z.object({
  event: RequestEventSchema,
  payload: RequestPayloadSchema
});
export type Request = z.infer<typeof RequestSchema>;


export const ResponseEventSchema = z.literal("topic:statusChanged");
export type ResponseEvent = z.infer<typeof ResponseEventSchema>;

export const ResponsePayloadSchema = z.object({
  topicId: TopicIdSchema,
  status: TopicStatusSchema
});
export type ResponsePayload = z.infer<typeof ResponsePayloadSchema>;

export const ResponseSchema = z.object({
  event: ResponseEventSchema,
  payload: ResponsePayloadSchema
});
export type Response = z.infer<typeof ResponseSchema>;