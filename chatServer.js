const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3030 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === 0) {
        console.log("waiting");
      } else {
        client.send(data);
      }
    });
  });
});
