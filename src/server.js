// import path, { parse } from "path";
// const __dirname = path.resolve();

// import WebSocket, { WebSocketServer } from "ws";

import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

app.use(cors());

// app.set("view engine", "pug");
// app.set("views", __dirname + "/src/views");
// app.use("/public", express.static(__dirname + "/src/public"));
// app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const ioServer = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
});

ioServer.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // socket["nickname"] = "Anon";
  // socket.onAny((event) => {
  //   console.log(`Socket Event: ${event}`);
  // });
  // socket.on("enter_room", (roomName, done) => {
  //   socket.join(roomName);
  //   done();
  //   socket.to(roomName).emit("welcome", socket.nickname);
  // });
  // socket.on("disconnecting", () => {
  //   socket.rooms.forEach((room) =>
  //     socket.to(room).emit("bye", socket.nickname)
  //   );
  // });
  // socket.on("new_message", (msg, room, done) => {
  //   socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
  //   done();
  // });
  // socket.on("nickname", (nickname) => (socket["nickname"] = nickname));

  socket.on("send_message", (message, done) => {
    socket.broadcast.emit("receive_message", message);
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
const handleListen = () => console.log(`Listening on http://localhost:3001`);
httpServer.listen(3001, handleListen);
