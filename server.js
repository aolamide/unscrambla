const http = require('http');
const path = require('path');
const express = require('express');
const { games } = require('./helpers/game');

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

require('./connection')(io);

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    next();
  }
});
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/games', (_, res) => {
  let activeGames = JSON.parse(JSON.stringify(games));
  for(let game in activeGames) {
    delete activeGames[game].currentWord;
  };
  res.json(activeGames);
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('Server listening on PORT', PORT);
});