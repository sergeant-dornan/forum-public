"use client";

import { useAppSelector } from "@/lib/hooks";
import styles from "./topics.module.css";
import Link from "next/link";
import { selectTopics } from "@/features/topics/topicsSelector";

interface TopicsProps {
  categoryIndex: number;
}

export default function Topics({ categoryIndex }: TopicsProps) {
  const { openTopics, closedTopics } = useAppSelector(selectTopics);
  
  const selectedOpenTopics = openTopics.filter(topic => Number(topic.categoryId) === categoryIndex + 1);
  const selectedClosedTopics = closedTopics.filter(topic => Number(topic.categoryId) === categoryIndex + 1);

  if (openTopics.length === 0 && closedTopics.length === 0)
    return <h2>Тем нет</h2>

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
  );
}