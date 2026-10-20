import { setUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { showError } from "@/shared/utils/Error/showError";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AuthFormActionState } from "./auth.types";

export function useAuthSubmit(userState: AuthFormActionState, isPending: boolean) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Отслеживание состояния формы
  useEffect(() => {
    setIsSubmitting(isPending);
    if (isPending) return;

    if (!userState) return;
    if (isAppError(userState)) {
      showError(userState);
      return;
    }

    setIsSubmitting(true);
    dispatch(setUser(userState));
    router.push('/forum');
  }, [userState, isPending, setIsSubmitting, router]);

  return { isSubmitting }
}