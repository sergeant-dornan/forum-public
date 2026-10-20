import z from "zod";
import * as Message from "../message/_index.message.ws.js";
import * as Topic from "../topic/_index.topic.ws.js";
import { Error } from "../_index.ws.js";

export const RequestSchema = z.discriminatedUnion("event", [
  Message.CreateMessage.RequestSchema,
  Message.DeleteMessage.RequestSchema,
  Topic.ChangeTopicRole.RequestSchema,
  Topic.ChangeTopicStatus.RequestSchema,
  Topic.CreateTopic.RequestSchema,
  Topic.DeleteTopic.RequestSchema,
  Topic.DeleteTopicRole.RequestSchema,
  Topic.JoinTopic.RequestSchema
]);
export type Request = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.discriminatedUnion("event", [
  Message.CreateMessage.ResponseSchema,
  Message.DeleteMessage.ResponseSchema,
  Topic.ChangeTopicRole.ResponseSchema,
  Topic.ChangeTopicStatus.ResponseSchema,
  Topic.CreateTopic.ResponseSchema,
  Topic.DeleteTopic.ResponseSchema,
  Topic.DeleteTopicRole.ResponseSchema,
  Topic.JoinTopic.ResponseSchema,
  Error.ResponseSchema
]);
export type Response = z.infer<typeof ResponseSchema>;