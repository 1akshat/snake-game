const WS = require('ws');

const server = new WS.Server({ port: 8080 });

server.on('connection', webSocket => {
  webSocket.on('message', coordinates => {
    console.log(coordinates);
    server.clients.forEach((client) => {
      if (client !== server && client.readyState === WS.OPEN) {
        client.send(JSON.stringify(coordinates));
      }
    });
  });
});