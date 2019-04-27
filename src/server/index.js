let app = require("http").createServer();
let io = (module.exports.io = require("socket.io")(app));

const PORT = process.env.PORT || 3231;

const socketManager = require("./socketManager");

io.on("connection", socketManager);

app.listen(PORT, () => {
  console.log("connected to port:" + PORT);
});
