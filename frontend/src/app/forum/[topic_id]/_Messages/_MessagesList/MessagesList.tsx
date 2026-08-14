"use client";

import MainMessage from "./_MainMessage/MainMessage";
import { GroupedVirtuoso, type GroupedVirtuosoHandle } from "react-virtuoso";
import styles from "./messages-list.module.css";
import { getLocaleDate } from "@/shared/utils/dateUtils";
import Message from "./_Message/Message";
import type { MessageListItem, TopicDetails } from "@forum/shared";
import type { MessagesGroup } from "../_hooks/useMessagesState/useMessagesState.types";
import type { RefObject } from "react";
import RecomendationPanel from "./_RecomendationPanel/RecomendationPanel";

interface MessagesListProps {
  topic: TopicDetails;
  messagesGroups: MessagesGroup[];
  messagesGroupCounts: number[];
  flatMessages: MessageListItem[];
  ref: RefObject<GroupedVirtuosoHandle | null>;
}

export default function MessagesList(
  { topic, messagesGroups, messagesGroupCounts, flatMessages, ref }: MessagesListProps
) {
  return (
    <GroupedVirtuoso
      overscan={400}
      followOutput="smooth"
      ref={ref}
      className={`${styles["virtuoso-messages"]}`}

      components={{
        Header: () => <MainMessage authorData={topic} />,

        List: ({ children, style, ...props }) => (
          <>
            <div className={styles["sticky-wrapper"]}>
              <RecomendationPanel topicId={topic.topicId} />
            </div>
            <div {...props} style={style} className={`${styles["messages-list"]}`}>
              {children}
            </div>
          </>
        ),

        Group: ({ children, ...props }) => (
          <div {...props} className={`grey rounded ${styles["messages-date"]}`}>
            {children}
          </div>
        )
      }}

      // Резервируем место под первое сообщение 
      groupCounts={messagesGroupCounts}

      groupContent={(groupIndex) => {
        const group = messagesGroups[groupIndex];
        if (!group) return null;

        const messagesDate = getLocaleDate(new Date(group?.date), "ru-RU");

        return (
          <time dateTime={messagesDate}>{messagesDate}</time>
        )
      }}

      itemContent={(index) => {
        const message = flatMessages[index];
        if (!message) return null;
        return <Message message={message} topic={topic} />;
      }}
    />
  );
}