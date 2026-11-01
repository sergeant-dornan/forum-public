import z from "zod";
import * as Auth from "../auth/_index.auth.http.js";
import * as Category from "../category/_index.category.http.js";
import * as Message from "../message/_index.message.http.js";
import * as Topic from "../topic/_index.topic.http.js";
import * as User from "../user/_index.user.http.js";
import { Error } from "../_index.http.js";

export const ReqBodySchema = z.union([
  Auth.CheckSession.ReqBodySchema,
  Auth.Login.ReqBodySchema,
  Auth.Logout.ReqBodySchema,
  Auth.Registration.ReqBodySchema,
  Category.GetCategories.ReqBodySchema,
  Message.CreateMessage.ReqBodySchema,
  Message.DeleteMessage.ReqBodySchema,
  Message.GetMessages.ReqBodySchema,
  Topic.ChangeTopicRole.ReqBodySchema,
  Topic.ChangeTopicStatus.ReqBodySchema,
  Topic.CreateTopic.ReqBodySchema,
  Topic.DeleteTopic.ReqBodySchema,
  Topic.DeleteTopicRole.ReqBodySchema,
  Topic.GetSimilarTopics.ReqBodySchema,
  Topic.GetTopic.ReqBodySchema,
  Topic.GetTopicRoles.ReqBodySchema,
  Topic.GetTopics.ReqBodySchema,
  Topic.SearchTopics.ReqBodySchema,
  User.GetMe.ReqBodySchema,
  User.GetUserRoles.ReqBodySchema,
  User.GetUserTopics.ReqBodySchema,
  Error.ReqBodySchema
]);
export type ReqBody = z.infer<typeof ReqBodySchema>;