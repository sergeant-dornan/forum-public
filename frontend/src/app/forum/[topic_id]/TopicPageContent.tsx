"use client";

import styles from "./topic.module.css";
import { useEffect } from "react";
import { useUser } from "@/shared/contexts/UserContext";
import { useForum } from "@/shared/contexts/ForumContext";
import ws from "@/shared/api/ws/WebSocketClient";
import MessageInput from "./_MessageInput/MessageInput";
import Messages from "./_Messages/Messages";
import type { MessageListItem, TopicDetails } from "@forum/shared";

interface TopicPageContentProps {
  messages: MessageListItem[];
  topic: TopicDetails;
}

export default function TopicPageContent({ messages, topic }: TopicPageContentProps) {
  const { topicId, status } = topic;
  // Узнаем, показываeт ли навигацию
  const { navigationHidden } = useForum();

  const { loading, user } = useUser();
  const userId = user?.userId;

  // Работа с WebSocket
  useEffect(() => {
    // Первоначальный вход
    if (topicId && userId)
      ws.notify.topicLogged(topicId, userId);

    // Повторный вход после переподключения
    const handleConnect = () => {
      if (topicId && userId)
        ws.notify.topicLogged(topicId, userId);
    }

    ws.on("connected", handleConnect);
    return () => {
      ws.off("connected", handleConnect);
    }
  }, [topicId, userId]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className={`${styles["page-div"]}`}>
      <h2 className={`grey ${styles["location-header"]} ${!navigationHidden ? "mobile-hidden" : ""}`}>
        {topic.categoryTitle}: {topic.title}
      </h2>

      <div className={`${styles["topic-div"]} ${!navigationHidden ? "mobile-hidden" : ""}`}>
        <Messages initialMessages={messages} topic={topic} />
      </div>

      <div className={`${styles["message-input"]} ${!navigationHidden ? "mobile-hidden" : ""}`}>
        {status === "open" &&
          <MessageInput topicId={topicId} />}
      </div>
    </div>
  )
}