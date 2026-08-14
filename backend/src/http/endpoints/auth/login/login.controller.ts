import type { NextFunction, Request, Response } from 'express';
import loginService from './login.service.js';
import type { HTTP, User } from '@forum/shared';

export default async function loginController(
  req: Request, res: Response<HTTP.ResponseBody.Login>, next: NextFunction
): Promise<void> {
  try {
    const username: User["username"] = req.body.username;
    const password: string = req.body.password;
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
  catch (error) {
    next(error);
  }
}