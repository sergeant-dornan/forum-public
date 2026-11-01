import { RequestValidationError, SocketValidationError, type ValidationLocation } from "../CustomErrors.js";
import type { ParseableSchema } from "./parsers.types.js";

export function parseOrThrow<S>(
  schema: ParseableSchema<S>,
  data: unknown,
  reqLocation?: ValidationLocation
) {
  const result = schema.safeParse(data);

  if (!result.success) {
    if (reqLocation) throw new RequestValidationError(result.error.issues, reqLocation);
    if (!reqLocation) throw new SocketValidationError(result.error.issues);
    throw new Error("Ошибка валидации");
  }
  return result.data;
}