const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });
console.log("server0",server);
server.on('connection', (socket) => {
  console.log('A user connected.');
  socket.on('message', (data) => {
    console.log("MSG",data);
    server.clients.forEach((client) => {
      console.log('client',client);
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  socket.on('close', () => {
    console.log('A user disconnected.');
  });
});

console.log('WebSocket server is running on ws://localhost:3000');
