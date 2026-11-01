import z from "zod";

export const ParamsSchema = z.object({}).optional();
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = z.void();
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({}).optional();
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({}).optional();
export type ReqQuery = z.infer<typeof ReqQuerySchema>;