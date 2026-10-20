import ws from "@/shared/api/ws/WebSocketClient";
import type { AppError } from "@/shared/utils/Error/Error.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";

export async function createTopicHandler(formData: FormData): Promise<void | AppError> {
  try {
    const categoryId = formData.get("categoryId")?.toString().trim();
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();

    if (!categoryId) return ErrorFactory.unexpectedError();

    if (!title || !description) return ErrorFactory.userError("Название и описание не должны быть пустыми");
    if (title.length > 70) return ErrorFactory.userError(`Слишком длинное название (${title.length} символов из 70)`);
    if (description.length > 1500) return ErrorFactory.userError(`Слишком длинное описание (${description.length} символов из 1500)`);

    ws.send.createTopic({ categoryId, title, description });
  }
  catch (error) {
    return toAppError(error);
  }
}