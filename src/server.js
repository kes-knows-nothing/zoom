import path, { parse } from 'path';
const __dirname = path.resolve();
import http from "http";
// import WebSocket, { WebSocketServer } from "ws";
import  { Server } from "socket.io"
import express from "express";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
  });
});








// const wss = new WebSocketServer({ server })

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   console.log("Connected to Browser ✅");
//   socket["nickname"] = "Anon";
//   socket.on("close", () => console.log("Disconnected from the Browser ❌"));
//   socket.on("message", (msg) => {
//     msg = msg.toString('utf-8')
//     const message = JSON.parse(msg);
//     console.log(message)
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break
//       case "nickname":
//         socket["nickname"] = message.payload;
//         break
//     }
//   });
// });

httpServer.listen(3000, handleListen);