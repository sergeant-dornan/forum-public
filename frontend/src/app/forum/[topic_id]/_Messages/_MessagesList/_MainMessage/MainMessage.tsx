"use client";

import styles from "./main-message.module.css";
import { getShortLocaleDate } from "@/shared/utils/dateUtils";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import type { TopicDetails } from "@forum/shared/schemas";

export default function MainMessage({ authorData }: { authorData: TopicDetails }) {
  const { userId: authorId, username, createdAt, src, alt, description } = authorData;
  const user = useAppSelector((state) => state.user);

  // Дата создания темы
  const date = getShortLocaleDate(new Date(createdAt), "ru-RU");

  return (
    <article className={`black square ${styles["main-message"]}`}>
      <div className={`pink square ${styles["user-info"]}`}>
        <Image src={`/users/${src}`} alt={alt} width={128} height={128} className="crimson rounded" />
        <h3 className="crimson rounded">{username}{user.userId === authorId ? " (Вы)" : ""}</h3>
        <time dateTime={createdAt} className="crimson rounded">{date}</time>
      </div>
      <h2 className="selectable-text">{description}</h2>
    </article>
  )
}