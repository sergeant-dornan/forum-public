"use server";

import http from "@/shared/api/http/HttpClient";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { AppError } from "@/shared/utils/Error/Error.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { parseNumber } from "@/shared/utils/parseNumber";
import type { TopicDetails } from "@forum/shared";

// Отправка
export default async function createTopicAction(formData: FormData): Promise<TopicDetails | AppError> {
  try {
    const categoryId = parseNumber(formData.get("categoryId"));
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();

    if (!categoryId) return ErrorFactory.unexpectedError();

    if (!title || !description) return ErrorFactory.userError("Название и описание не должны быть пустыми");
    if (title.length > 70) return ErrorFactory.userError(`Слишком длинное название (${title.length} символов из 70)`);
    if (description.length > 1500) return ErrorFactory.userError(`Слишком длинное описание (${description.length} символов из 1500)`);

    // Создаем тему
    const topicHttpClient = await http.server.createTopicClient();
    const result = await topicHttpClient.createTopic(categoryId, title, description);
    if (isAppError(result)) return result;

    return result.data;
  }
  catch (error) {
    return toAppError(error);
  }
}