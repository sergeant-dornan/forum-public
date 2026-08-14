import styles from "./message.module.css";
import ws from "@/shared/api/ws/WebSocketClient"
import { useUser } from "@/shared/contexts/UserContext";
import { banUserAction, unbanUserAction } from "./action";
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useForum } from "@/shared/contexts/ForumContext";
import type { TopicDetails, TopicRole } from "@forum/shared";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { isAppError } from "@/shared/utils/Error/Error.guards";

interface BanButtonProps {
  authorRole: TopicRole["role"] | undefined;
  authorId: TopicDetails["userId"];
  topicId: TopicDetails["topicId"];
}

export default function BanButton({ authorRole, authorId, topicId }: BanButtonProps) {
  const { isConnected } = useForum();
  // Получаем список ролей, в которых пользователь
  const { loading, user } = useUser();
  if (loading || !user) return null;
  const { roles, userId } = user;

  // Не рендерим если пользователь не админ или автор
  if (roles[topicId] !== "admin" || authorId === userId) return null;

  // Ф-ия нажатия на кнопку бана
  const banHandler = async (topicId: TopicDetails["topicId"], authorId: TopicDetails["userId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Забанить пользователя?", "Пользователь будет забанен в этой теме")) {
        const result = await banUserAction(topicId, authorId);
        if (isAppError(result)) throw result;

        ws.notify.userRoleToggled(authorId, topicId, "banned");
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }

  // Ф-ия нажатия на кнопку разбана
  const unbanHandler = async (topicId: TopicDetails["topicId"], authorId: TopicDetails["userId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Разбанить пользователя?", "Пользователь сможет вернуться к обсуждению")) {
        const result = await unbanUserAction(topicId, authorId);
        if (isAppError(result)) throw result;
        ws.notify.userRoleToggled(authorId, topicId, null);
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }

  if (authorRole === "banned") {
    return (
      <button onClick={() => { unbanHandler(topicId, authorId) }} title="Разбанить пользователя" className={`grey rounded ${styles["message-button"]}`}>
        <Image src="/ui/lock-open.svg" alt="Разбанить" height={24} width={24} />
      </button>
    );
  }
  return (
    <button onClick={() => { banHandler(topicId, authorId) }} title="Забанить пользователя" className={`grey rounded ${styles["message-button"]}`}>
      <Image src="/ui/lock-closed.svg" alt="Забанить" height={24} width={24} />
    </button>
  );
}