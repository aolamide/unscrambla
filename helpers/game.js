const getGameId = require('./gameId');
const { getRandomWord, scrambleWord } = require('./words');

const games = {};

const initialGame = {
  host : '',
  hostName : '',
  playerTwo : '',
  playerTwoName : '',
  hostScore : 0,
  playerTwoScore : 0,
  gameId : '',
  currentWord : '',
  currentScrambled : '',
  hostReplay : false,
  playerTwoReplay : false
};

const createGame = (host, hostName) => {
  const gameId = getGameId();
  const game = {...initialGame};
  game.gameId = gameId;
  game.host = host;
  game.hostName = hostName;
  games[gameId] = game;
  return game.gameId;
}

const checkCode = code => {
  const gameExists = games[code];
  if(gameExists && gameExists.playerTwo) return { success : false, msg : 'Game already has two players.'}
  else if(gameExists) return { success : true, game : gameExists }
  else return { success : false, msg : 'Game not found'}
}

const joinGame = (playerId, playerName, game) => {
  const checkGame = checkCode(game);
  if(checkGame.success) {
    checkGame.game.playerTwo = playerId;
    checkGame.game.playerTwoName = playerName;
    const startWord = getRandomWord();
    checkGame.game.currentWord = startWord;
    checkGame.game.currentScrambled = scrambleWord(startWord);
    return { success : true, game : checkGame.game };
  } else {
    return checkGame;
  }
}

const guessWord = (word, gameId, playerId) => {
  const game = games[gameId];
  if(game) {
    if(word == game.currentWord) {
      if(playerId == game.host) game.hostScore++;
      else if(playerId == game.playerTwo) game.playerTwoScore++;
      game.currentWord = game.currentScrambled = '';
      const newWord = getRandomWord();
      game.currentWord = newWord;
      game.currentScrambled = scrambleWord(newWord);
      return true;
    } else {
      return false;
    }
  }
}

const getCurrentScrambledWord = gameCode => {
  const game = games[gameCode];
  if(game) {
    return game.currentScrambled;
  }
  return '';
}

const getScores = gameCode => {
  const game = games[gameCode];
  if(game) {
    const { hostScore, playerTwoScore } = game;
    return { hostScore, playerTwoScore };
  }
  return false;
}

const getGameResults = gameCode => {
  const game = games[gameCode];
  if(game) {
    const { hostScore, playerTwoScore, gameHistory } = game;
    return { hostScore, playerTwoScore, gameHistory }
  }
  return false;
}

const replayGame = (gameCode, id) => {
  const game = games[gameCode];
  if(game) {
    game.hostScore = 0;
    game.playerTwoScore = 0;
    if(game.host == id) game.hostReplay = true;
    else if(game.playerTwo == id) game.playerTwoReplay = true;
    if(game.playerTwoReplay && game.hostReplay) {
      game.hostReplay = game.playerTwoReplay = false;
      return { hostName : game.hostName, playerTwoName : game.playerTwoName };
    };
    return false;
  }
  return false;
}

module.exports = { createGame, checkCode, joinGame, games, guessWord, getCurrentScrambledWord, getScores, getGameResults, replayGame }