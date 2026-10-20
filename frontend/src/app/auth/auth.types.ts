import type { AppError } from "@/shared/utils/Error/Error.types";
import type { UserState } from "@forum/shared/schemas";

export type AuthFormActionState = UserState | AppError | null

export type AuthFormProps = {
  action: (payload: FormData) => void;
  isSubmitting: boolean;
}