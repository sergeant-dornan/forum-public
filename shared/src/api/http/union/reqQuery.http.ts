import z from "zod";
import * as Auth from "../auth/_index.auth.http.js";
import * as Category from "../category/_index.category.http.js";
import * as Message from "../message/_index.message.http.js";
import * as Topic from "../topic/_index.topic.http.js";
import * as User from "../user/_index.user.http.js";
import { Error } from "../_index.http.js";

export const ReqQuerySchema = z.union([
  Auth.CheckSession.ReqQuerySchema,
  Auth.Login.ReqQuerySchema,
  Auth.Logout.ReqQuerySchema,
  Auth.Registration.ReqQuerySchema,
  Category.GetCategories.ReqQuerySchema,
  Message.CreateMessage.ReqQuerySchema,
  Message.DeleteMessage.ReqQuerySchema,
  Message.GetMessages.ReqQuerySchema,
  Topic.ChangeTopicRole.ReqQuerySchema,
  Topic.ChangeTopicStatus.ReqQuerySchema,
  Topic.CreateTopic.ReqQuerySchema,
  Topic.DeleteTopic.ReqQuerySchema,
  Topic.DeleteTopicRole.ReqQuerySchema,
  Topic.GetSimilarTopics.ReqQuerySchema,
  Topic.GetTopic.ReqQuerySchema,
  Topic.GetTopicRoles.ReqQuerySchema,
  Topic.GetTopics.ReqQuerySchema,
  Topic.SearchTopics.ReqQuerySchema,
  User.GetMe.ReqQuerySchema,
  User.GetUserRoles.ReqQuerySchema,
  User.GetUserTopics.ReqQuerySchema,
  Error.ReqQuerySchema
]);
export type ReqQuery = z.infer<typeof ReqQuerySchema>;