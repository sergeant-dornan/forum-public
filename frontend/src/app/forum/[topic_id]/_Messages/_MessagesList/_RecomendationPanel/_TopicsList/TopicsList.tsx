"use client";

import styles from "./topic-list.module.css";

import Link from "next/link";
import { filterTopics } from "@/features/topics/topicHelpers";
import { useMemo } from "react";
import type { TopicListItem } from "@forum/shared/schemas";

export default function TopicsList({ topics }: { topics: TopicListItem[] }) {
  const { openTopics, closedTopics } = useMemo(() => {
    return filterTopics(topics)
  }, [topics]);

  if (topics.length === 0) {
    return (
      <ul className={`black ${styles["topic-list"]}`}>
        <h2>Похожих тем нет</h2>
      </ul>
    )
  }

  return (
    <ul className={`black ${styles["topic-list"]}`}>
      {openTopics.length > 0 && <h2>Открытые темы:</h2>}
      {openTopics.map((topic) => {
        return (
          <li key={topic.topicId} className="crimson rounded">
            <Link href={`/forum/${topic.topicId}`}>{topic.title}</Link>
          </li>
        )
      })}

      {closedTopics.length > 0 && <h2>Закрытые темы:</h2>}
      {closedTopics.map((topic) => {
        return (
          <li key={topic.topicId} className="grey rounded">
            <Link href={`/forum/${topic.topicId}`}>{topic.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}