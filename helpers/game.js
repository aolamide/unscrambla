const getGameId = require('./gameId');

const games = [];

const initialGame = {
  host : '',
  hostName : '',
  playerTwo : '',
  playerTwoName : '',
  hostScore : 0,
  playerTwoScore : 0,
  gameId : '',
  gameHistory : [ { hostScore : 0, playerTwoScore : 0} ]
}

const createGame = (host, hostName) => {
  const gameId = getGameId();
  const game = {...initialGame};
  game.gameId = gameId;
  game.host = host;
  game.hostName = hostName;
  games.push(game);
  return game.gameId;
}

const checkCode = code => {
  const gameExists = games.find(game => game.gameId === code);
  if(gameExists && gameExists.playerTwo) return { success : false, msg : 'Game already has two players.'}
  else if(gameExists) return { success : true, game : gameExists }
  else return { success : false, msg : 'Game not found'}
}

const joinGame = (playerId, playerName, game) => {
  const checkGame = checkCode(game);
  if(checkGame.success) {
    checkGame.game.playerTwo = playerId;
    checkGame.game.playerTwoName = playerName;
    return { success : true, game : checkGame.game };
  } else {
    return checkGame;
  }
}

module.exports = { createGame, checkCode, joinGame, games }