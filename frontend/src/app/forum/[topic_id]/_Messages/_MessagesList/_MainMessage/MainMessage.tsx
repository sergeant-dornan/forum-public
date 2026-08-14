"use client";

import styles from "./main-message.module.css";
import { getShortLocaleDate } from "@/shared/utils/dateUtils";
import { useUser } from "@/shared/contexts/UserContext";
import Image from "next/image";
import type { TopicDetails } from "@forum/shared";

export default function MainMessage({ authorData }: { authorData: TopicDetails }) {
  const { userId: authorId, username, createdAt, src, alt, description } = authorData;
  const { loading, user } = useUser();

  if (loading || !user) {
    return null;
  }

  const { userId } = user;

  // Дата создания темы
  const date = getShortLocaleDate(createdAt, "ru-RU");

  return (
    <article className={`black square ${styles["main-message"]}`}>
      <div className={`pink square ${styles["user-info"]}`}>
        <Image src={`/users/${src}`} alt={alt} width={128} height={128} className="crimson rounded" />
        <h3 className="crimson rounded">{username}{userId === authorId ? " (Вы)" : ""}</h3>
        <time dateTime={createdAt.toDateString()} className="crimson rounded">{date}</time>
      </div>
      <h2 className="selectable-text">{description}</h2>
    </article>
  )
}