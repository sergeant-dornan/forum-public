import styles from "./forum.module.css";
import Navigation from "./_components/_Navigation/Navigation";
import ConnectionStatus from "./_components/_ConnectionStatus/ConnectionStatus";
import Header from "./_components/_Header/Header";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import MainContentProvider from "@/providers/MainContentProvider";
import ForumDataInitializer from "@/features/forum/ForumDataInitializer";

export const metadata: Metadata = {
  title: "Форум",
  description: "Форум для знакомств и общения",
};

export default async function ForumLayout({ children }: { children: ReactNode }) {
  return (
    <ForumDataInitializer>
      <div className={`${styles["forum-layout"]}`}>
        <ConnectionStatus />
        <header className={`${styles["header-div"]}`}>
          <Header />
        </header>
        <div className={`${styles["page-div"]}`}>
          <Navigation />
          <MainContentProvider>
            {children}
          </MainContentProvider>
        </div>
      </div>
    </ForumDataInitializer>
  );
}
