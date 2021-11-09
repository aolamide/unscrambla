const http = require('http');
const path = require('path');
const express = require('express');
const { games } = require('./helpers/game');

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

require('./connection')(io);

//middlewares
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.get('/games', (req, res) => {
  res.json(games);
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('Server listening on PORT', PORT);
});