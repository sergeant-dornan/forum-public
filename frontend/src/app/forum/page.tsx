"use client";

import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const isNavOpen = useAppSelector((state) => state.ui.isNavOpen);
  const user = useAppSelector((state) => state.user);

  if (!user.username) return <h1>Добро пожаловать на форум!</h1>
  
  return (
    <div className={`${!isNavOpen ? "mobile-hidden" : ""}`}>
      <h1>Добро пожаловать на форум, {user.username}!</h1>
      <h2 className="computer-hidden">
        <i>Нажмите "Показать навигацию", чтобы увидеть темы</i>
      </h2>
    </div>
  );
}
