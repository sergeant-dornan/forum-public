import type { Union } from "@forum/shared/ws";
import type { ParseableSchema } from "../parsers.types.js";

export type WSMessageSchema<M extends Union.Request> = ParseableSchema<M>;

export type ParsedWSMessage<M extends Union.Request> = M;