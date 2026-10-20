import type { Request, Response } from 'express';
import registrationService from './registration.service.js';
import { Registration } from '@forum/shared/http';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';

export default async function registrationController(
  req: Request<unknown, Registration.ResBody, unknown, unknown, {}>, 
  res: Response<Registration.ResBody, {}>
): Promise<void> {
  const parsed = parseRequest(Registration, req)
  const { username, password, email, phone } = parsed.reqBody;
  
  const ipAddress = req.ip;
  if (ipAddress === undefined) throw new Error("IP - undefined");

  const { sessionId, user } = await registrationService(username, password, email, phone, ipAddress);

  // Возвращаем положительный статус и отправляем куку
  const isHTTPS: boolean = process.env.HTTPS === "true";
  res.cookie("session", sessionId, {
    httpOnly: true,
    sameSite: isHTTPS ? 'none' : 'lax',
    secure: isHTTPS,
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(201).json(user);
}