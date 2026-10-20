"use client";

import styles from "./my-topics.module.css";
import TopicsList from "./_TopicsList/TopicsList";
import { useAppSelector } from "@/lib/hooks";
import { selectUserTopics } from "@/features/topics/topicsSelector";

export default function MyTopicsPage() {
  const userId = useAppSelector((state) => state.user.userId);

  if (!userId) return <div>Загрузка...</div>;

  const { topicsList, openTopics, closedTopics, hiddenTopics }
    = useAppSelector((state) => selectUserTopics(state, userId));

  return (
    <div className={`${styles["topics-div"]}`}>
      <div>
        <h1 className={`${styles["section-title"]}`}>Ваши темы: ({topicsList.length}/{30})</h1>

        {/* Открытые */}
        {openTopics.length > 0 && <div>
          <h1 className={`${styles["section-title"]}`}>Открытые темы: ({openTopics.length}/{5})</h1>
          <TopicsList topics={openTopics} />
        </div>
        }

        {/* Закрытые */}
        {closedTopics.length > 0 && <div>
          <h1 className={`${styles["section-title"]}`}>Закрытые темы: ({closedTopics.length}/{5})</h1>
          <TopicsList topics={closedTopics} />
        </div>
        }

        {/* Скрытые */}
        {hiddenTopics.length > 0 && <div>
          <h1 className={`${styles["section-title"]}`}>Скрытые темы:</h1>
          <TopicsList topics={hiddenTopics} />
        </div>
        }
      </div>
    </div>
  )
}