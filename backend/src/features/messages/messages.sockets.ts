import createMessageSocket from "./createMessage/createMessage.socket.js";
import deleteMessageSocket from "./deleteMessage/deleteMessage.socket.js";

export const messagesSockets = {
  "message:create": createMessageSocket,
  "message:delete": deleteMessageSocket
};