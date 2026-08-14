"use client";

import { showError } from "@/shared/utils/Error/showError";
import { toAppError } from "@/shared/utils/Error/toAppError";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    showError(toAppError(error))
  }, [error]);

  return (
    <div style={{textAlign: "center"}}>
      <h1>Что-то пошло не так</h1>
      <Link href="/" style={{ color: "blue", fontSize: "1.25em" }}>Вернуться на главную?</Link>
    </div>
  )
}