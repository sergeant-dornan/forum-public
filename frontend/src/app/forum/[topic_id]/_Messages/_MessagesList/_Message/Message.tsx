"use client";

import styles from "./message.module.css";
import { getLocaleTime } from "@/shared/utils/dateUtils";
import DeleteButton from "./DeleteButton";
import { useUser } from "@/shared/contexts/UserContext";
import BanButton from "./BanButton";
import Image from "next/image";
import { useTopicRoles } from "@/shared/contexts/TopicRolesContext";
import type { MessageListItem, TopicDetails } from "@forum/shared";

interface MessageProps {
  message: MessageListItem;
  topic: TopicDetails;
}

export default function Message({ message, topic }: MessageProps) {
  const { topicId, status } = topic;
  const { messageId, userId: authorId, src, alt, username, createdAt, textContent } = message;

  const { roles } = useTopicRoles();
  const role = roles[authorId];

  const { loading, user } = useUser();

  if (loading || !user) return null;

  const { userId } = user;

  // Получаем время отправки сообщения
  const messageTime = getLocaleTime(createdAt, "ru-RU");

  return (
    <div className={`${styles["message"]}`}>
      <div className={`crimson rounded ${styles["message-user-info"]}`}>
        <Image src={`/users/${src}`} alt={alt} width={36} height={36} className={`pink rounded`} />

        <h3 className={`${styles["message-username"]}`}>{username}</h3>
        <h4>в</h4>
        <time dateTime={messageTime}><h3>{messageTime}</h3></time>
        <h4>пишет:</h4>
        <h4>{role ? `(${role}) ` : ""}{authorId === userId ? `(Вы) ` : ""}</h4>
      </div>

      <div className={`${styles["message-base"]}`}>
        <h4 className={`selectable-text ${styles["message-text"]}`}>{textContent}</h4>
        {status === "open" &&
          <div className={`${styles["message-buttons"]}`}>
            <DeleteButton messageId={messageId} authorId={authorId} topicId={topicId} />
            <BanButton authorRole={role} authorId={authorId} topicId={topicId} />
          </div>}
      </div>
    </div>
  )
}