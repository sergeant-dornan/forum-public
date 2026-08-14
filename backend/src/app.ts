import { pool } from "./shared/config/db.js";
import { createServer } from "http";
import addWebSocketServer from "./ws/index.js";
import httpApp from "./http/index.js";

const server = createServer(httpApp);
addWebSocketServer(server);

// Пробный запрос к БД
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("Error connecting to the database", err.stack);
  else console.log("Connected to the database:", res.rows);
});

if (!process.env.PORT) {
  console.error("Укажите PORT в .env в backend");
  process.exit(1);
}

server.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log(`Server on http://localhost:${process.env.PORT}`)
});