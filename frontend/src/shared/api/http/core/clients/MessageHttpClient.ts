import type { HTTP, Message } from "@forum/shared";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class MessageHttpClient extends BaseHttpClient {
  getMessages(topicId: Message["topicId"], { after }: { after?: number } = {}) {
    const params = new URLSearchParams();
    if (after) params.append("after", after.toString())

    const url = params.toString()
      ? `/messages/${topicId}?${params.toString()}`
      : `/messages/${topicId}`;

    return this.request<HTTP.Data.GetMessages>(url, { method: "GET", cache: "no-cache" });
  }


  createMessage(message: Message["textContent"], topicId: Message["topicId"]) {
    return this.request<HTTP.Data.CreateMessage>("/messages", {
      method: "POST",
      body: JSON.stringify({ message, topicId })
    });
  }


  deleteMessage(messageId: Message["messageId"]) {
    return this.request<HTTP.Data.DeleteMessage>(`/messages/${messageId}`, {
      method: "DELETE",
    });
  }
}