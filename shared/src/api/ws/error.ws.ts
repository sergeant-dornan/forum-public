import z from "zod";

export const ResponseEventSchema = z.literal("error");
export type ResponseEvent = z.infer<typeof ResponseEventSchema>;

export const ResponsePayloadSchema = z.object({
  code: z.number(),
  message: z.string().optional(),
  validationErrorLocation: z.array(z.string()).optional(),
  requestValidationIssues: z.array(z.unknown()).optional()
});
export type ResponsePayload = z.infer<typeof ResponsePayloadSchema>;

export const ResponseSchema = z.object({
  event: ResponseEventSchema,
  payload: ResponsePayloadSchema
});
export type Response = z.infer<typeof ResponseSchema>;