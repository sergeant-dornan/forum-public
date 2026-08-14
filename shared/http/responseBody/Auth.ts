import type { HTTP } from "../../index.js";

export type CheckSession = HTTP.Core.ResponseBodyBase<HTTP.Data.CheckSession>;

export type Registration = HTTP.Core.ResponseBodyBase<HTTP.Data.Registration>;

export type Login = HTTP.Core.ResponseBodyBase<HTTP.Data.Login>;

export type Logout = HTTP.Core.ResponseBodyBase<HTTP.Data.Logout>;