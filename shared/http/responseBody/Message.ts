import type { HTTP } from "../../index.js";

export type CreateMessage = HTTP.Core.ResponseBodyBase<HTTP.Data.CreateMessage>;

export type DeleteMessage = HTTP.Core.ResponseBodyBase<HTTP.Data.DeleteMessage>;

export type GetMessages = HTTP.Core.ResponseBodyBase<HTTP.Data.GetMessages>;