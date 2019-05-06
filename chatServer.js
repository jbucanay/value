const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3030 });

wss.on("connection", function connection(ws) {
  console.log("client connected");

  ws.on("message", function incoming(data) {
    console.log("recieved: %s ", data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(data);
        } catch (e) {
          client.send(e);
        }
      }
    });
  });
});
