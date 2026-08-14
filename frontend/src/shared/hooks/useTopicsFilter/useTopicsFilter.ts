import { useState, useEffect, useMemo } from "react";
import ws from "@/shared/api/ws/WebSocketClient";
import type { Topic, TopicListItem, WS } from "@forum/shared";
import type { ClosedTopic, HiddenTopic, OpenTopic } from "./useTopicsFilter.types";
import { isClosedTopic, isHiddenTopic, isOpenTopic } from "./useTopicsFilter.guards";

type TopicsDict = Record<Topic["topicId"], TopicListItem>

export default function useTopicsFilter(initialTopics: TopicListItem[]) {
  // Состояние, хранящее все темы (для WebSocket)
  // Объект для предотвращения дубликатов (Хук возвращает МАССИВ)
  const [topics, setTopics] = useState<TopicsDict>({});
  useEffect(() => {
    setTopics(initialTopics.reduce((dict: TopicsDict, topic) => {
      dict[topic.topicId] = topic;
      return dict;
    }, {}) || {});
  }, [initialTopics]);

  // Работа с WebSocket
  useEffect(() => {
    const topicCreatedHandler = (data: WS.Data.TopicCreated) => {
      const { topic } = data;

      setTopics((prev) => ({
        ...prev,
        [topic.topicId]: topic
      }));
    }

    const topicDeletedHandler = (data: WS.Data.TopicDeleted) => {
      const { topicId } = data;

      setTopics((prev) => {
        // Удаление без мутации
        const { [topicId]: _, ...rest } = prev;
        return rest;
      });
    }

    const topicStatusToggledHandler = (data: WS.Data.TopicStatusToggled) => {
      const { topicId, status } = data;

      setTopics((prev) => {
        // Проверяем, существует ли тема
        if (!prev[topicId]) return prev;

        // Обновляем статус нужной темы
        return {
          ...prev,
          [topicId]: {
            ...prev[topicId],
            status: status
          }
        };
      });
    }

    // Подписываемся
    ws.on("topicCreated", topicCreatedHandler);
    ws.on("topicDeleted", topicDeletedHandler);
    ws.on("topicStatusToggled", topicStatusToggledHandler);

    // Отписываемся
    return () => {
      ws.off("topicCreated", topicCreatedHandler);
      ws.off("topicDeleted", topicDeletedHandler);
      ws.off("topicStatusToggled", topicStatusToggledHandler);
    }
  }, []);

  // Фильтруем темы
  const { openTopics, closedTopics, hiddenTopics, topicsArray } = useMemo<{
    openTopics: OpenTopic[], closedTopics: ClosedTopic[], hiddenTopics: HiddenTopic[], topicsArray: TopicListItem[]
  }>(() => {
    const openTopics: OpenTopic[] = [];
    const closedTopics: ClosedTopic[] = [];
    const hiddenTopics: HiddenTopic[] = [];

    // Преобразуем объект в массив значений
    const topicsArray = Object.values(topics);

    topicsArray.forEach(topic => {
      if (isOpenTopic(topic)) openTopics.push(topic)
      else if (isClosedTopic(topic)) closedTopics.push(topic)
      else if (isHiddenTopic(topic)) hiddenTopics.push(topic)
      else console.warn(`Неизвестный статус темы ${topic.status}`)
    });

    return { openTopics, closedTopics, hiddenTopics, topicsArray };
  }, [topics]);

  return { openTopics, closedTopics, hiddenTopics, allTopics: topicsArray };
}