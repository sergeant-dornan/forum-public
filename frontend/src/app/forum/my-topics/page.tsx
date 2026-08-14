import http from "@/shared/api/http/HttpClient";
import styles from "./my-topics.module.css";

import MyTopicsPageContent from "./MyTopicsPageContent";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default async function MyTopicsPage() {
  const userHttpClient = await http.server.createUserClient();
  const result = await userHttpClient.getTopics();
  if (isAppError(result)) throw result;

  return (
    <div className={`${styles["topics-div"]}`}>
      <MyTopicsPageContent topics={result.data} />
    </div>
  )
}