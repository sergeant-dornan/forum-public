import type { NextFunction, Request, Response } from 'express';
import registrationService from './registration.service.js';
import type { HTTP, User } from '@forum/shared';

export default async function registrationController(
  req: Request, res: Response<HTTP.ResponseBody.Registration>, next: NextFunction
): Promise<void> {
  try {
    const username: User["username"] = req.body.username;
    const password: string = req.body.password;
    const email: User["email"] = req.body.email.toLowerCase().trim();
    const phone: User["phone"] = req.body.phone.trim();
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
  catch (error) {
    next(error);
  }
}