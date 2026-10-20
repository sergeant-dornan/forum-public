import type { Request, Response } from 'express';
import loginService from './login.service.js';
import { Login } from '@forum/shared/http';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';

export default async function loginController(
  req: Request<unknown, Login.ResBody, unknown, unknown, {}>, 
  res: Response<Login.ResBody, {}>
): Promise<void> {
  const parsed = parseRequest(Login, req);
  const { username, password } = parsed.reqBody;
  
  const ipAddress = req.ip;
  if (ipAddress === undefined) throw new Error("IP - undefined");

  const { sessionId, user } = await loginService(username, password, ipAddress);

  // Возвращаем положительный статус и отправляем куку
  const isHTTPS: boolean = process.env.HTTPS === "true";
  res.cookie("session", sessionId, {
    httpOnly: true,
    sameSite: isHTTPS ? 'none' : 'lax',
    secure: isHTTPS,
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json(user);
}