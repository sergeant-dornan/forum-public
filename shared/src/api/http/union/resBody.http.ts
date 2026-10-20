import z from "zod";
import * as Auth from "../auth/_index.auth.http.js";
import * as Category from "../category/_index.category.http.js";
import * as Message from "../message/_index.message.http.js";
import * as Topic from "../topic/_index.topic.http.js";
import * as User from "../user/_index.user.http.js";
import { Error } from "../_index.http.js";

export const ResBodySchema = z.union([
  Auth.CheckSession.ResBodySchema,
  Auth.Login.ResBodySchema,
  Auth.Logout.ResBodySchema,
  Auth.Registration.ResBodySchema,
  Category.GetCategories.ResBodySchema,
  Message.CreateMessage.ResBodySchema,
  Message.DeleteMessage.ResBodySchema,
  Message.GetMessages.ResBodySchema,
  Topic.ChangeTopicRole.ResBodySchema,
  Topic.ChangeTopicStatus.ResBodySchema,
  Topic.CreateTopic.ResBodySchema,
  Topic.DeleteTopic.ResBodySchema,
  Topic.DeleteTopicRole.ResBodySchema,
  Topic.GetSimilarTopics.ResBodySchema,
  Topic.GetTopic.ResBodySchema,
  Topic.GetTopicRoles.ResBodySchema,
  Topic.GetTopics.ResBodySchema,
  Topic.SearchTopics.ResBodySchema,
  User.GetMe.ResBodySchema,
  User.GetUserRoles.ResBodySchema,
  User.GetUserTopics.ResBodySchema,
  Error.ResBodySchema
]);
export type ResBody = z.infer<typeof ResBodySchema>;