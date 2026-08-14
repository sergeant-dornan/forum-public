"use client";

import { useForum } from "@/shared/contexts/ForumContext";
import { useUser } from "@/shared/contexts/UserContext";

export default function Home() {
  const { navigationHidden } = useForum();
  const { user, loading } = useUser();

  if (loading || !user) return <h1>Добро пожаловать на форум!</h1>
  
  return (
    <div className={`${!navigationHidden ? "mobile-hidden" : ""}`}>
      <h1>Добро пожаловать на форум, {user.username}!</h1>
      <h2 className="computer-hidden">
        <i>Нажмите "Показать навигацию", чтобы увидеть темы</i>
      </h2>
    </div>
  );
}
