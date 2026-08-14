import type { User } from "../domain.types.js";
import type { UserRole } from "./Role.js";

export interface UserContext {
  userId: User["userId"];
  username: User["username"];
  roles: UserRole; 
}