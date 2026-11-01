import { CreateMessage, DeleteMessage, GetMessages } from "@forum/shared/http";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class MessageHttpClient extends BaseHttpClient {
  getMessages(
    topicId: GetMessages.Params["topicId"],
    { after }: GetMessages.ReqQuery = {}
  ) {
    const params = new URLSearchParams();
    if (after) params.append("after", after.toString())

    const url = params.toString()
      ? `/messages/${topicId}?${params.toString()}`
      : `/messages/${topicId}`;

    return this.request(GetMessages, "GET", url, { cache: "no-cache" });
  }


  createMessage(
    message: CreateMessage.ReqBody["message"],
    topicId: CreateMessage.ReqBody["topicId"]
  ) {
    return this.request(CreateMessage, "POST", "/messages", {
      body: JSON.stringify({ message, topicId })
    });
  }


  deleteMessage(
    messageId: DeleteMessage.Params["messageId"]
  ) {
    return this.request(DeleteMessage, "DELETE", `/messages/${messageId}`);
  }
}