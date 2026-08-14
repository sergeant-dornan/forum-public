"use client";

import type { ClosedTopic, OpenTopic } from "@/shared/hooks/useTopicsFilter/useTopicsFilter.types";
import styles from "./topics.module.css";
import Link from "next/link";

interface TopicsProps {
  openTopics: OpenTopic[];
  closedTopics: ClosedTopic[];
  categoryIndex: number;
}

export default function Topics({ openTopics, closedTopics, categoryIndex }: TopicsProps) {
  const selectedOpenTopics = openTopics.filter(topic => topic.categoryId === categoryIndex + 1);
  const selectedClosedTopics = closedTopics.filter(topic => topic.categoryId === categoryIndex + 1);

  if (openTopics.length === 0 && closedTopics.length === 0) {
    return <h2>Тем нет</h2>
  }

  return (
    <section className={`${styles["topics-div"]}`}>
      <h2>Выберите тему:</h2>
      <ul>
        {selectedOpenTopics.map((topic) => {
          return (
            <li key={topic.topicId} className="crimson rounded">
              <Link href={`/forum/${topic.topicId}`}>
                {topic.title}
              </Link>
            </li>
          )
        })}

        {selectedClosedTopics.length > 0 && <h2>Закрытые темы:</h2>}
        {selectedClosedTopics.map((topic) => {
          return (
            <li key={topic.topicId} className="grey rounded">
              <Link href={`/forum/${topic.topicId}`}>
                {topic.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}