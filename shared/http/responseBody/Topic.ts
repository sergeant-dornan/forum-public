import type { HTTP } from "../../index.js";

export type ChangeTopicStatus = HTTP.Core.ResponseBodyBase<HTTP.Data.ChangeTopicStatus>;

export type ChangeUserRole = HTTP.Core.ResponseBodyBase<HTTP.Data.ChangeUserRole>;

export type CreateTopic = HTTP.Core.ResponseBodyBase<HTTP.Data.CreateTopic>;

export type DeleteTopic = HTTP.Core.ResponseBodyBase<HTTP.Data.DeleteTopic>;

export type DeleteUserRole = HTTP.Core.ResponseBodyBase<HTTP.Data.DeleteUserRole>;

export type GetSimilarTopics = HTTP.Core.ResponseBodyBase<HTTP.Data.GetSimilarTopics>;

export type GetTopic = HTTP.Core.ResponseBodyBase<HTTP.Data.GetTopic>;

export type GetTopicRoles = HTTP.Core.ResponseBodyBase<HTTP.Data.GetTopicRoles>;

export type GetTopics = HTTP.Core.ResponseBodyBase<HTTP.Data.GetTopics>;

export type SearchTopic = HTTP.Core.ResponseBodyBase<HTTP.Data.SearchTopic>;