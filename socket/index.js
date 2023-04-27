import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.FRONT_END_URL } });
const PORT = process.env.PORT || 8000;

let users = [];

app.get("/", (req, res) => {
  res.send("Hello socket server");
});

io.on("connection", (socket) => {
  // on user connection
  socket.on("new-connection", (user) => {
    users.push({ ...user, socketId: socket.id });
    io.emit("return-users", users);
  });

  // on user disconnect
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("return-users", users);
  });

  // on user create new notification
  socket.on("create-new-notification", (response) => {
    const user = response?.notification?.user;
    const client = users.filter((item) => user.includes(item._id));

    if (client.length > 0) {
      client.forEach((item) => {
        socket
          .to(item.socketId)
          .emit("new-notification", response?.notification);
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server socket is running on port ${PORT}`);
});
