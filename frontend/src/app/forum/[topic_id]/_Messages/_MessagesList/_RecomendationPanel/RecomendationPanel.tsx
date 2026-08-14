"use client";

import { useEffect, useState } from "react";
import TopicsList from "./_TopicsList/TopicsList";
import styles from "./recomendaton-panel.module.css"
import http from "@/shared/api/http/HttpClient";
import type { TopicDetails, TopicListItem } from "@forum/shared";
import { showError } from "@/shared/utils/Error/showError";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { toAppError } from "@/shared/utils/Error/toAppError";

export default function RecomendationPanel({ topicId }: { topicId: TopicDetails["topicId"] }) {
  const [showList, setShowList] = useState(false);
  const [similarTopics, setSimilarTopics] = useState<TopicListItem[]>([]);

  useEffect(() => {
    const getSimilarTopics = async () => {
      try {
        const topicHttpClient = http.client.getTopicClient();
        const result = await topicHttpClient.getSimilarTopics(topicId);
        if (isAppError(result)) throw result;
        setSimilarTopics(result.data);
      } catch (error) {
        setSimilarTopics([]);
        showError(toAppError(error));
      }
    }

    getSimilarTopics();
  }, [topicId]);

  return (
    <div className={`${styles["panel-div"]}`}>
      <button onClick={() => setShowList(!showList)} className="pink">
        <h3>{showList ? "▲ Скрыть похожие темы" : "▼ Показать похожие темы"}</h3>
      </button>

      {showList && <TopicsList topics={similarTopics} />}
    </div>
  )
}