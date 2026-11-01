import z from "zod";
import { UserStateSchema } from "../../../schemas/user.dto.js";

export const ParamsSchema = z.object({}).optional();
export type Params = z.infer<typeof ParamsSchema>;

export const ResBodySchema = UserStateSchema;
export type ResBody = z.infer<typeof ResBodySchema>;

export const ReqBodySchema = z.object({
  username: z.string(),
  password: z.string()
});
export type ReqBody = z.infer<typeof ReqBodySchema>;

export const ReqQuerySchema = z.object({}).optional();
export type ReqQuery = z.infer<typeof ReqQuerySchema>;