"use client";

import styles from "./topic.module.css";
import { useEffect } from "react";
import ws from "@/shared/api/ws/WebSocketClient";
import MessageInput from "./_MessageInput/MessageInput";
import Messages from "./_Messages/Messages";
import type { MessageListItem, TopicDetails } from "@forum/shared/schemas";

interface TopicPageContentProps {
  messages: MessageListItem[];
  topic: TopicDetails;
}

export default function TopicPageContent({ messages, topic }: TopicPageContentProps) {
  const { topicId, status } = topic;

  // Работа с WebSocket
  useEffect(() => {
    // Первоначальный вход
    if (topicId)
      ws.send.joinTopic({ topicId });

    // Повторный вход после переподключения
    const handleConnect = () => {
      if (topicId)
        ws.send.joinTopic({ topicId });
    }

    ws.on("connected", handleConnect);
    return () => {
      ws.off("connected", handleConnect);
    }
  }, [topicId]);

  return (
    <div className={`${styles["page-div"]}`}>
      <h2 className={`grey ${styles["location-header"]}`}>
        {topic.categoryTitle}: {topic.title}
      </h2>

      <div className={`${styles["topic-div"]}`}>
        <Messages initialMessages={messages} topic={topic} />
      </div>

      <div className={`${styles["message-input"]}`}>
        {status === "open" &&
          <MessageInput topicId={topicId} />}
      </div>
    </div>
  )
}