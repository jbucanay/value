const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

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
    if (user.firstName !== "" && user.lastName !== "") {
      emitVisitors();
      console.log(user);
    }
  });
  socket.on("disconnect", function() {
    emitVisitors();
    console.log("user diconnected");
  });
});
