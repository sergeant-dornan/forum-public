import z from "zod";
import * as Auth from "../auth/_index.auth.http.js";
import * as Category from "../category/_index.category.http.js";
import * as Message from "../message/_index.message.http.js";
import * as Topic from "../topic/_index.topic.http.js";
import * as User from "../user/_index.user.http.js";
import { Error } from "../_index.http.js";

export const ParamsSchema = z.union([
  Auth.CheckSession.ParamsSchema,
  Auth.Login.ParamsSchema,
  Auth.Logout.ParamsSchema,
  Auth.Registration.ParamsSchema,
  Category.GetCategories.ParamsSchema,
  Message.CreateMessage.ParamsSchema,
  Message.DeleteMessage.ParamsSchema,
  Message.GetMessages.ParamsSchema,
  Topic.ChangeTopicRole.ParamsSchema,
  Topic.ChangeTopicStatus.ParamsSchema,
  Topic.CreateTopic.ParamsSchema,
  Topic.DeleteTopic.ParamsSchema,
  Topic.DeleteTopicRole.ParamsSchema,
  Topic.GetSimilarTopics.ParamsSchema,
  Topic.GetTopic.ParamsSchema,
  Topic.GetTopicRoles.ParamsSchema,
  Topic.GetTopics.ParamsSchema,
  Topic.SearchTopics.ParamsSchema,
  User.GetMe.ParamsSchema,
  User.GetUserRoles.ParamsSchema,
  User.GetUserTopics.ParamsSchema,
  Error.ParamsSchema
]);
export type Params = z.infer<typeof ParamsSchema>;