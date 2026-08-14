import http from "@/shared/api/http/HttpClient";
import styles from "./create-topic.module.css";

import CreateTopicForm from "./CreateTopicForm";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default async function NewTopicPage() {
  // Получаем категории
  const categoryHttpClient = await http.server.createCategoryClient();
  const result = await categoryHttpClient.getCategories();
  if (isAppError(result)) throw result;

  return (
    <div className={`${styles["create-topic-div"]}`}>
      <CreateTopicForm categories={result.data} />
    </div>
  )
}