"use server";

import http from "@/shared/api/http/HttpClient";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { AppError } from "@/shared/utils/Error/Error.types";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { cookies } from "next/headers";

type LogoutActionReturnValue = undefined | AppError;

export async function logoutAction(): Promise<LogoutActionReturnValue> {
  try {
    const sessionCookie = (await cookies()).get("session")?.value;

    const authHttpClient = http.server.createAuthClient(sessionCookie);
    const result = await authHttpClient.logout();
    if (isAppError(result)) return result;
    
    (await cookies()).delete("session");
    return;
  }
  catch (error) {
    return toAppError(error);
  }
}