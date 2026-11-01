import type { Union } from "@forum/shared/http";
import type { EndpointFullSchema } from "./parseJsonSafely.types";

export async function parseHttpJsonSafely<P extends Union.Params, R extends Union.ResBody, B extends Union.ReqBody, Q extends Union.ReqQuery>(
  schema: EndpointFullSchema<P, R, B, Q>,
  json: unknown
): Promise<R | Error> {
  try {
    const parsed = schema.ResBodySchema.safeParse(json)
    if (!parsed.success) return new Error(`Ошибка валидации http json: ${JSON.stringify(parsed.error.issues)}`);

    return parsed.data;
  }
  catch (error) {
    return new Error(`Ошибка парсинга http json: ${error}`);
  }
}