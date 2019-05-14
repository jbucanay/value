require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require("moment");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "src/chatServer.js");
});
app.use(express.static(`${__dirname}/../build`));

const getVisitors = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(s => s.user);
  return users;
};

const emitVisitors = () => {
  io.emit("visitors", getVisitors());
};

io.on("connection", function(socket) {
  console.log("new user connected");
  socket.on("new_user", user => {
    socket.user = user;
    emitVisitors();
    console.log("user connected");
    socket.on("disconnect", function() {
      emitVisitors();
      console.log("user diconnected");
    });
  });

  socket.on("typing", typer => {
    socket.broadcast.emit("incoming", typer);

    socket.on("clear", () => {
      typer = "";

      socket.broadcast.emit("incoming", typer);
    });
  });

  socket.on("message", msg => {
    const time = moment().format("LT");
    const day = moment().format("dddd");
    const userMessage = {
      msg,
      time,
      day
    };

    socket.broadcast.emit("user_message", userMessage);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

server.listen(PORT, () => {
  console.log("chat server on  " + PORT);
});
