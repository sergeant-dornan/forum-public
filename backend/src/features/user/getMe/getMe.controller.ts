import type { Request, Response } from "express";
import getMeService from "./getMe.service.js";
import type { GetMe } from "@forum/shared/http";
import type { AuthLocals } from "@/shared/middlewares/authMiddleware.js";

export default async function getMeController(
  _req: Request<unknown, GetMe.ResBody, unknown, unknown, AuthLocals>,
  res: Response<GetMe.ResBody, AuthLocals>
): Promise<void> {
  const { userId } = res.locals;

  const me = await getMeService(userId);

  res.status(200).json(me);
}