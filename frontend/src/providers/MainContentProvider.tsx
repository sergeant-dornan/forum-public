"use client";

import { useAppSelector } from "@/lib/hooks";
import type { ReactNode } from "react";

export default function MainContentProvider({ children }: { children: ReactNode }) {
  const isNavOpen = useAppSelector((state) => state.ui.isNavOpen);

  return (
    <main className={`${isNavOpen ? "mobile-hidden" : ""}`}>
      {children}
    </main>
  );
}