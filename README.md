# Chatty App

A simple messaging app written in JSX, Javascript, HTML and CSS; using WebSockets for real-time communication.

### Usage

```
git clone https://github.com/Zxela/chatty-app.git chatty
cd chatty
npm install
npm start
cd chatty_server
npm install
nodemon server.js
open http://localhost:3000
```

### Dependencies

- NodeJS 6.0.0+
- NPM

Front-End

- React
- ReactDOM
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

Back-End

- WebSocketServer ("ws")
- UUID
- Express
- Nodemon

## Final Product

### Multiple Clients

!["Two Clients Connected"](https://github.com/Zxela/chatty-app/blob/master/docs/open.png)

### Changing Username

!["Change User"](https://github.com/Zxela/chatty-app/blob/master/docs/userchange.png)

### Two Clients in Action

!["Both Users Can Send and Recieve"](https://github.com/Zxela/chatty-app/blob/master/docs/message.png)
