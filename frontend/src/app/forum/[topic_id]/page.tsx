import http from "@/shared/api/http/HttpClient";
import TopicPageContent from "./TopicPageContent";
import { parseNumber } from "@/shared/utils/parseNumber";
import { isAppError } from "@/shared/utils/Error/Error.guards";

interface DiscussionPageProps {
  params: Promise<{
    topic_id: string;
  }>;
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  // Получаем айди темы из параметров
  const topicId = parseNumber((await params).topic_id);

  const [topicHttpClient, messageHttpClient] = await Promise.all([
    http.server.createTopicClient(),
    http.server.createMessageClient()
  ]);

  // Запускаем все запросы параллельно
  const [getTopicResult, getMessagesResult] = await Promise.all([
    topicHttpClient.getTopic(topicId),
    messageHttpClient.getMessages(topicId),
  ]);
  if (isAppError(getTopicResult)) throw getTopicResult;
  if (isAppError(getMessagesResult)) throw getMessagesResult;

  return (
    <TopicPageContent
      topic={getTopicResult.data}
      messages={getMessagesResult.data}
    />
  )
}