import type { UserContext } from "../../entities/User.js";

export type CheckSession = never;

export type Registration = UserContext;

export type Login = UserContext;

export type Logout = never;