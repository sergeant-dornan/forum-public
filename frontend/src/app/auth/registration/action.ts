"use server";

import http from "@/shared/api/http/HttpClient";
import { cookies } from "next/headers";
import type { AuthFormActionState } from "../auth.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { toAppError } from "@/shared/utils/Error/toAppError";

// Функция, которая валидирует и отправляет полученные данные на бэк
export async function registrationAction(
  _prevState: AuthFormActionState, formData: FormData
): Promise<AuthFormActionState> {
  try {
    // Получаем данные из FormData
    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const password1 = formData.get("password1")?.toString().trim();
    const password2 = formData.get("password2")?.toString().trim();

    if (!username || !email || !phone || !password1 || !password2)
      return ErrorFactory.userError("Заполните форму полностью");

    // Проверка длины имени пользоваеля
    if (username.length > 50)
      return ErrorFactory.userError(`Имя пользователя должно не больше 50 символов (${username.length} символов из 50)`);

    // Проверка совпадения паролей
    if (password1 !== password2)
      return ErrorFactory.userError("Пароли не совпадают");

    // Проверка пароля
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/.test(password1))
      return ErrorFactory.userError(`Пароль должен включать в себя минимум 8 символов, одну строчную и заглавную латинскую букву, одну цифру, один специальный символ (!@#$%^&*()_+-=[]{};':"|,.<>\\/?~)`);

    // Проверка телефона
    if (!/^\d{8,15}$/.test(phone))
      return ErrorFactory.userError("Телефон должен включать в себя 8-15 цифр записаных без скобок, плюса и разделителей.");

    // Проверка email
    if (!/@/.test(email))
      return ErrorFactory.userError("email должен включать в себя символ @");

    // Отправляем данные на сервер, полуаем сессию, объект пользователя
    const authHttpClient = http.server.createAuthClient();
    const result = await authHttpClient.registration(username, password1, email, phone);

    if (isAppError(result)) return result;
    const { data, headers } = result;

    const setCookieHeader = headers.get("set-cookie")
    if (!setCookieHeader) return ErrorFactory.unexpectedError();

    const sessionCookie = setCookieHeader.split(";")[0];
    if (!sessionCookie) return ErrorFactory.unexpectedError();

    const [name, value] = sessionCookie.split("=");
    if (!name || !value) return ErrorFactory.unexpectedError();

    const isHTTPS = process.env.HTTPS === "true";

    (await cookies()).set({
      name: name.trim(),
      value: value.trim(),
      httpOnly: true,
      sameSite: isHTTPS ? "none" : "lax",
      secure: isHTTPS,
      maxAge: 24 * 60 * 60 * 1000
    });

    return data;
  }
  catch (error) {
    return toAppError(error);
  }
}