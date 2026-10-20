import { ChangeTopicRole, ChangeTopicStatus, CreateTopic, DeleteTopic, DeleteTopicRole, GetSimilarTopics, GetTopic, GetTopicRoles, GetTopics, SearchTopics } from "@forum/shared/http";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class TopicHttpClient extends BaseHttpClient {
  getTopics() {
    return this.request(GetTopics, "GET", "/topics");
  }


  getTopic(
    topicId: GetTopic.Params["topicId"]
  ) {
    return this.request(GetTopic, "GET", `/topics/${topicId}`);
  }


  createTopic(
    categoryId: CreateTopic.ReqBody["categoryId"],
    title: CreateTopic.ReqBody["title"],
    description: CreateTopic.ReqBody["description"]
  ) {
    return this.request(CreateTopic, "POST", "/topics", {
      body: JSON.stringify({ categoryId, title, description })
    });
  }


  deleteTopic(
    topicId: DeleteTopic.Params["topicId"]
  ) {
    return this.request(DeleteTopic, "DELETE", `/topics/${topicId}`);
  }


  searchTopics(
    q: SearchTopics.ReqQuery["q"], 
    categoryId?: SearchTopics.ReqQuery["categoryId"]
  ) {
    const params = new URLSearchParams();

    params.append('q', q);
    if (categoryId !== undefined)
      params.append('categoryId', String(categoryId));

    return this.request(SearchTopics, "GET", `/topics/search?${params.toString()}`);
  }


  getRoles(
    topicId: GetTopicRoles.Params["topicId"]
  ) {
    return this.request(GetTopicRoles, "GET", `/topics/${topicId}/roles`);
  }


  changeTopicRole(
    topicId: ChangeTopicRole.Params["topicId"], 
    targetUserId: ChangeTopicRole.ReqBody["targetUserId"], 
    newRole: ChangeTopicRole.ReqBody["newRole"]
  ) {
    return this.request(ChangeTopicRole, "POST", `/topics/${topicId}/role`, {
      body: JSON.stringify({ targetUserId, newRole })
    });
  }


  deleteTopicRole(
    topicId: DeleteTopicRole.Params["topicId"], 
    userId: DeleteTopicRole.Params["userId"]
  ) {
    return this.request(DeleteTopicRole, "DELETE", `/topics/${topicId}/users/${userId}/role`);
  }


  getSimilarTopics(
    topicId: GetSimilarTopics.Params["topicId"]
  ) {
    return this.request(GetSimilarTopics, "GET", `/topics/${topicId}/similar`);
  }


  changeTopicStatus(
    topicId: ChangeTopicStatus.Params["topicId"], 
    status: ChangeTopicStatus.ReqBody["status"]
  ) {
    return this.request(ChangeTopicStatus, "PATCH", `/topics/${topicId}/status`, {
      body: JSON.stringify({ status })
    });
  }
}