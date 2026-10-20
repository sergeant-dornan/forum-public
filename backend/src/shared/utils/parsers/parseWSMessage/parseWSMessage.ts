import type { Union } from "@forum/shared/ws";
import { parseOrThrow } from "../parseOrThrow.js";
import type { ParsedWSMessage, WSMessageSchema } from "./parseWSMessage.types.js";

export function parseWSMessage<M extends Union.Request>(
  RequestSchema: WSMessageSchema<M>, 
  message: unknown
): ParsedWSMessage<M> {
  return parseOrThrow(RequestSchema, message);
}