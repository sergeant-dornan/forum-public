import type { Category, HTTP, Topic, TopicRole, User } from "@forum/shared";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class TopicHttpClient extends BaseHttpClient {
  getTopics() {
    return this.request<HTTP.Data.GetTopics>("/topics", { method: "GET" });
  }


  getTopic(topicId: Topic["topicId"]) {
    return this.request<HTTP.Data.GetTopic>(`/topics/${topicId}`, { method: "GET" });
  }

  
  createTopic(
    categoryId: Category["categoryId"], title: Category["title"], description: Category["description"]
  ) {
    return this.request<HTTP.Data.CreateTopic>("/topics", {
      method: "POST",
      body: JSON.stringify({ categoryId, title, description })
    });
  }


  deleteTopic(topicId: Topic["topicId"]) {
    return this.request<HTTP.Data.DeleteTopic>(`/topics/${topicId}`, { method: "DELETE" });
  }


  searchTopic(q: string, categoryId?: Category["categoryId"]) {
    const params = new URLSearchParams();

    params.append('q', q);
    if (categoryId !== undefined)
      params.append('category-id', String(categoryId));

    return this.request<HTTP.Data.SearchTopic>(`/topics/search?${params.toString()}`, { method: "GET" });
  }


  getRoles(topicId: Topic["topicId"]) {
    return this.request<HTTP.Data.GetTopicRoles>(`/topics/${topicId}/roles`, { method: "GET" });
  }


  changeUserRole(topicId: Topic["topicId"], userId: User["userId"], role: TopicRole["role"]) {
    return this.request<HTTP.Data.ChangeUserRole>(`/topics/${topicId}/role`, {
      method: "POST",
      body: JSON.stringify({ userId, role })
    });
  }


  deleteUserRole(topicId: Topic["topicId"], userId: User["userId"]) {
    return this.request<HTTP.Data.DeleteUserRole>(`/topics/${topicId}/users/${userId}/role`, { method: "DELETE" });
  }


  getSimilarTopics(topicId: Topic["topicId"]) {
    return this.request<HTTP.Data.GetSimilarTopics>(`/topics/${topicId}/similar`, { method: "GET" });
  }

  
  changeTopicStatus(topicId: Topic["topicId"], status: Topic["status"]) {
    return this.request<HTTP.Data.ChangeTopicStatus>(`/topics/${topicId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  }
}