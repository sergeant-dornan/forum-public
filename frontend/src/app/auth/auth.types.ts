import type { AppError } from "@/shared/utils/Error/Error.types";
import type { UserContext } from "@forum/shared";

export type AuthFormActionState = UserContext | AppError | null