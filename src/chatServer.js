const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require("moment");
const PORT = 3131;

server.listen(PORT, () => {
  console.log("chat server on  " + PORT);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "src/chatServer.js");
});

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
  socket.on("message", msg => {
    const time = moment().format("LT");
    const day = moment().format("dddd");
    const userMessage = {
      msg,
      time,
      day
    };
    console.log(socket);
    socket.broadcast.emit("user_message", userMessage);
  });
});
