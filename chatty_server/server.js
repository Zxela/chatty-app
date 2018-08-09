// requirements
const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

//
const messages = [];

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new WebSocket.Server({ server });
wss.broadcast = data => {
  wss.clients.forEach(client => {
    client.readyState === WebSocket.OPEN && client.send(data); //trying out short-circuiting
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('open', function open() {
    console.log('connected');
    ws.send(messages);
  });

  ws.on('message', data => {
    newData = JSON.parse(data);
    switch (newData.type) {
      // If data type is a new message
      case 'newMessage':
        let incMessage = newData.content;
        incMessage.id = uuidv4();
        messages.push(incMessage);
        wss.broadcast(JSON.stringify(incMessage));
        break;
      case 'userChanged':
        let currentUser = newData.content.currentUser;
        let previousUser = newData.content.previousUser;
        console.log(
          `Previous User:${previousUser} || Current User:${currentUser}`
        );
        break;
      // DEFAULT CASE - To catch edge cases
      default:
        console.log(`Unsupported message: ${newData}`);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
