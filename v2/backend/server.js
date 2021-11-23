const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const {
  chatEvents,
  shiftEvents,
  announcementEvents,
  memberEvents,
  orgEvents,
} = require("./events");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connect", (socket) => {
  console.log("New WS Connection...");
  socket.emit("message", {
    authorName: "Server",
    message: "Welcome to Server!",
  });
  memberEvents(io, socket);
  chatEvents(io, socket);
  shiftEvents(io, socket);
  announcementEvents(io, socket);
  orgEvents(io, socket);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
