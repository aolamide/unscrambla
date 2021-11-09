const { createGame, checkCode, joinGame } = require("./helpers/game");

module.exports = function(io) {
  io.on('connection', (socket) => {

    socket.on('createGame', host => {
      const gameId = createGame(socket.id, host);
      socket.join(gameId);
      socket.emit('gameCreated', gameId);
    });
    
    socket.on('checkCode', code => {
      const result = checkCode(code);
      socket.emit('checkCodeResult', result);
    });

    socket.on('joinGame', ({ playerName, gameCode }) => {
      const result = joinGame(socket.id, playerName, gameCode);
      if(result.success) {
        socket.join(gameCode);
        io.to(gameCode).emit('gameReady', {host : result.game.hostName, playerTwo : result.game.playerTwoName });
        setTimeout(() => {
          io.to(gameCode).emit('gameStarted');
        }, 10000);
      } else {
        socket.emit('checkCodeResult', result);
      }
    })
  })
}