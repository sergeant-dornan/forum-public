import "express";
import type { User } from "@forum/shared";

declare module "express" {
  interface Request {
    userId?: User["userId"];
  }
}