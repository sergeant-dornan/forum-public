import type { Metadata } from "next";
import type { ReactNode } from "react";
import TechInfo from "./_TechInfo/TechInfo";

export const metadata: Metadata = {
  title: "Вход на форум",
  description: "Вход",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <TechInfo />
    </div>
  );
}
