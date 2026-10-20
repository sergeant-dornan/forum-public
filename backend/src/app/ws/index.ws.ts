import type { Server } from "http";
import { createWebSocketServer } from "./core/createWebSocketServer.ws.js";
import { handleClose } from "./handlers/handleClose.ws.js";
import { handleMessage } from "./handlers/handleMessage.ws.js";
import { handleHandshake } from "./handlers/handleHandshake.ws.js";
import { handleError } from "./handlers/handleError.ws.js";
import type WebSocket from "ws";

export function addWebSocket(server: Server) {
  const wss = createWebSocketServer(server);

  wss.on("connection", async (ws, req) => {
    const buffer: WebSocket.RawData[] = [];
    let ready = false;

    ws.on("message", async (data) => {
      if (!ready) { buffer.push(data); return; }
      try { await handleMessage(ws, data); }
      catch (error) { handleError(ws, error); }
    });

    ws.on("close", () => handleClose(ws));

    const ok = await handleHandshake(ws, req);
    if (!ok) { ws.close(); return; }

    ready = true;
    for (const data of buffer) {
      try { await handleMessage(ws, data); }
      catch (error) { handleError(ws, error); }
    }
    buffer.length = 0;
  });

  wss.on("error", (error) => console.error("ws server error:", error));

  return wss;
};