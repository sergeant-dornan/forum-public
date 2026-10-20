import z from "zod";
import { CategoryIdSchema } from "../../../schemas/common.dto.js";
import { TopicDetailsSchema } from "../../../schemas/topic.dto.js";

export const RequestEventSchema = z.literal("topic:create");
export type RequestEvent = z.infer<typeof RequestEventSchema>;

export const RequestPayloadSchema = z.object({
  title: z.string(),
  categoryId: CategoryIdSchema,
  description: z.string()
});
export type RequestPayload = z.infer<typeof RequestPayloadSchema>;

export const RequestSchema = z.object({
  event: RequestEventSchema,
  payload: RequestPayloadSchema
});
export type Request = z.infer<typeof RequestSchema>;


export const ResponseEventSchema = z.literal("topic:created");
export type ResponseEvent = z.infer<typeof ResponseEventSchema>;

export const ResponsePayloadSchema = TopicDetailsSchema;
export type ResponsePayload = z.infer<typeof ResponsePayloadSchema>;

export const ResponseSchema = z.object({
  event: ResponseEventSchema,
  payload: ResponsePayloadSchema
});
export type Response = z.infer<typeof ResponseSchema>;