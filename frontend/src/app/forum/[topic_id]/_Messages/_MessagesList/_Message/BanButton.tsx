import styles from "./message.module.css";
import ws from "@/shared/api/ws/WebSocketClient"
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useApp } from "@/contexts/AppContext";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { useAppSelector } from "@/lib/hooks";
import type { TopicDetails, TopicRole } from "@forum/shared/schemas";

interface BanButtonProps {
  authorRole: TopicRole | undefined;
  authorId: TopicDetails["userId"];
  topicId: TopicDetails["topicId"];
}

export default function BanButton({ authorRole, authorId, topicId }: BanButtonProps) {
  const { isConnected } = useApp();
  // Получаем список ролей, в которых пользователь
  const user = useAppSelector((state) => state.user);

  // Не рендерим если пользователь не админ или автор
  if (user.roles[topicId] !== "admin" || user.userId === authorId) return null;

  // Ф-ия нажатия на кнопку бана
  const banHandler = async (topicId: TopicDetails["topicId"], targetUserId: TopicDetails["userId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Забанить пользователя?", "Пользователь будет забанен в этой теме")) {
        ws.send.changeTopicRole({ targetUserId, topicId, newRole: "banned" });
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }

  // Ф-ия нажатия на кнопку разбана
  const unbanHandler = async (topicId: TopicDetails["topicId"], targetUserId: TopicDetails["userId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Разбанить пользователя?", "Пользователь сможет вернуться к обсуждению")) {
        ws.send.deleteTopicRole({ targetUserId, topicId });
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