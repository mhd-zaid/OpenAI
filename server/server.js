import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({path: ".env.local"});
const PORT = process.env.PORT || 3000;
app.set("port", PORT);
const server = http.createServer(app);

console.log(`listening on port ${PORT}`);
server.listen(PORT);
