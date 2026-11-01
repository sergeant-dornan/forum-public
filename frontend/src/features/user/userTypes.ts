import type { UserState as UserDomainState, TopicRole, TopicId } from "@forum/shared/schemas";

export type User = UserDomainState;

export interface UserState {
  userId: UserDomainState["userId"] | null;
  username: UserDomainState["username"] | null;
  roles: UserDomainState["roles"];
}

export interface SetTopicRolePayload {
  role: TopicRole | null;
  topicId: TopicId;
}