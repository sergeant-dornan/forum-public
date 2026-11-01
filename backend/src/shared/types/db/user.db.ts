import type { ToDbType } from "@/shared/mappers/toDb.mapper.js";
import type { UserRoleRecord, UserState } from "../domain/user.domain.js";

export type UserRoleRecordDb = UserRoleRecord

export type UserStateDb = ToDbType<UserState>