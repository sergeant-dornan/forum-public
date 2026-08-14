"use server";

import http from "@/shared/api/http/HttpClient";
import { cookies } from "next/headers";
import type { AuthFormActionState } from "../auth.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { toAppError } from "@/shared/utils/Error/toAppError";

// Функция, которая валидирует и отправляет полученные данные на бэк
export async function loginAction(
  _prevState: AuthFormActionState, formData: FormData
): Promise<AuthFormActionState> {
  try {
    // Получаем данные из FormData
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!username || !password) 
      return ErrorFactory.userError("Введите имя и пароль");

    // Проверка пароля
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/.test(password))
      return ErrorFactory.userError("Неверный пароль");

    // Отправляем данные на сервер, полуаем сессию, объект пользователя
    const authHttpClient = http.server.createAuthClient();
    const result = await authHttpClient.login(username, password);
    
    if (isAppError(result)) return result;
    const { data, headers } = result;

    // Достаем и устанавливаем куку
    const setCookieHeader = headers.get("set-cookie")
    if (!setCookieHeader) return ErrorFactory.unexpectedError();

    const sessionCookie = setCookieHeader.split(";")[0];
    if (!sessionCookie) return ErrorFactory.unexpectedError();

    const [name, value] = sessionCookie.split("=");
    if (!name || !value) return ErrorFactory.unexpectedError();

    // Устанавливаем куку, которая пойдет в браузер
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