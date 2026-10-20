import { NextRequest, NextResponse } from "next/server";
import http from "./shared/api/http/HttpClient";
import { isAppError } from "./shared/utils/Error/Error.guards";

export async function middleware(req: NextRequest) {
  // Проверка сессии
  const { pathname } = req.nextUrl;
  const authUrl = new URL("/auth", req.url);

  const sessionCookie = req.cookies.get("session")?.value;

  // Сессии нет
  if (!sessionCookie) {
    authUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(authUrl);
  }

  // Сессия есть
  const authHttpClient = http.server.createAuthClient(sessionCookie);
  const result = await authHttpClient.checkSession();

  // Сессия невалидна
  if (isAppError(result)) {
    const response = NextResponse.redirect(authUrl);
    response.cookies.delete("session");
    return response;
  }

  return NextResponse.next();
}

// Срабатывает только на страницах форума
export const config = {
  matcher: [
    "/forum/:path*"
  ]
};