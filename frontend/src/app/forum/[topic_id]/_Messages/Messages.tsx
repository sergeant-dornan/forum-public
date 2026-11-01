"use client";

import useMessagesWebSocket from "./_hooks/useMessagesWebSocket";
import { useMemo, useRef } from "react";
import ScrollButton from "./_ScrollButton/ScrollButton";
import useMessagesState from "./_hooks/useMessagesState/useMessagesState";
import type { GroupedVirtuosoHandle } from "react-virtuoso";
import MessagesList from "./_MessagesList/MessagesList";
import { useAppSelector } from "@/lib/hooks";
import type { MessageListItem, TopicDetails } from "@forum/shared/schemas";

interface MessagesProps {
  initialMessages: MessageListItem[];
  topic: TopicDetails;
}

export default function Messages({ initialMessages, topic }: MessagesProps) {
  const { topicId } = topic;
  const { messagesGroups, messagesDispatch, lastMessageId } = useMessagesState(initialMessages);
  const user = useAppSelector((state) => state.user);

  // Данные для Virtuoso
  const messagesListRef = useRef<GroupedVirtuosoHandle>(null);

  const [messagesGroupCounts, flatMessages] = useMemo(() => {
    const messagesGroupCounts: number[] = [];
    const flatMessages: MessageListItem[] = [];

    messagesGroups.forEach((group) => {
      messagesGroupCounts.push(group.messages.length);
      flatMessages.push(...group.messages);
    });

    return [messagesGroupCounts, flatMessages] as const;
  }, [messagesGroups]);

  // Функция для кнопки прокрутывания
  const scrollToBottom = () => {
    const lastIndex = flatMessages.length - 1;
    if (lastIndex >= 0) {
      messagesListRef.current?.scrollToIndex({
        index: lastIndex,
        align: "end",
        behavior: "auto"
      });
    }
  }

  // Подключаем веб сокет
  useMessagesWebSocket(topicId, messagesDispatch, lastMessageId);


  // Проверка на бан
  if (user.roles?.[topicId] === "banned") return <h1>Вас забанили в этой теме</h1>

  return <>
    <MessagesList
      topic={topic}
      messagesGroups={messagesGroups}
      messagesGroupCounts={messagesGroupCounts}
      flatMessages={flatMessages}
      ref={messagesListRef}
    />
    <ScrollButton scrollFunc={scrollToBottom} />
  </>
}