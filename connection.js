const { createGame, checkCode, joinGame, guessWord, getCurrentScrambledWord, getScores, getGameResults } = require("./helpers/game");

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
          setTimeout(() => {
            io.to(gameCode).emit('gameEnded', getGameResults(gameCode));
          }, 1000 * 60 * 2)
        }, 10000);
      } else {
        socket.emit('checkCodeResult', result);
      }
    });

    socket.on('playerTry', ({ wordPick, gameCode }) => {
      socket.broadcast.to(gameCode).emit('opponentTry', wordPick);
      const result = guessWord(wordPick, gameCode , socket.id);
      if(result) {
        io.to(gameCode).emit('adminMessage',`${wordPick} is correct. Great job!`);
        io.to(gameCode).emit('newScrambledWord', getCurrentScrambledWord(gameCode) );
        io.to(gameCode).emit('scoreUpdate', getScores(gameCode));
      } else {
        io.to(gameCode).emit('adminMessage' , `${wordPick} is wrong.`);
      }
    });

    socket.on('getScrambledWord', gameCode => {
      io.to(gameCode).emit('newScrambledWord', getCurrentScrambledWord(gameCode) );
    });
  })
}