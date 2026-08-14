import styles from "./forum.module.css";
import Navigation from "./_components/_Navigation/Navigation";
import ConnectionStatus from "./_components/_ConnectionStatus/ConnectionStatus";
import Header from "./_components/_Header/Header";
import { ForumProvider } from "@/shared/contexts/ForumContext";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Форум",
  description: "Форум для знакомств и общения",
};

export default async function ForumLayout({ children }: { children: ReactNode }) {
  return (
    <ForumProvider>
      <ConnectionStatus />
      <div className={`${styles["forum-layout"]}`}>
        <header className={`${styles["header-div"]}`}>
          <Header />
        </header>
        <div className={`${styles["page-div"]}`}>
          <Navigation />
          <main>{children}</main>
        </div>
      </div>
    </ForumProvider>
  );
}
