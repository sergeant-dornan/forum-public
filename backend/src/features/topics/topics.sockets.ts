import changeTopicRoleSocket from "./changeTopicRole/changeTopicRole.socket.js";
import changeTopicStatusSocket from "./changeTopicStatus/changeTopicStatus.socket.js";
import createTopicSocket from "./createTopic/createTopic.socket.js";
import deleteTopicSocket from "./deleteTopic/deleteTopic.socket.js";
import deleteTopicRoleSocket from "./deleteTopicRole/deleteTopicRole.socket.js";
import joinTopicSocket from "./joinTopic.socket.js";

export const topicsSockets = {
  "topic:changeRole": changeTopicRoleSocket,
  "topic:changeStatus": changeTopicStatusSocket,
  "topic:create": createTopicSocket,
  "topic:delete": deleteTopicSocket,
  "topic:deleteRole": deleteTopicRoleSocket,
  "topic:join": joinTopicSocket
};