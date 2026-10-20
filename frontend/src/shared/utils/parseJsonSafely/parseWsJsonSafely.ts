import { Union } from "@forum/shared/ws";

export function parseWsJsonSafely(json: unknown): Union.Response | Error {
  try {
    const parsed = Union.ResponseSchema.safeParse(json)
    if (!parsed.success) return new Error(`Ошибка валидации ws json: ${JSON.stringify(parsed.error.issues)}`);

    return parsed.data;
  }
  catch (error) {
    return new Error(`Ошибка парсинга ws json: ${error}`);
  }
}