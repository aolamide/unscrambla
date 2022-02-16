const Game = require('../model/game');
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
  playerTwoReplay : false,
  gameLive : false,
  skippedWords : []
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
  else return { success : false, msg : 'Game not found.'}
}

const joinGame = (playerId, playerName, game) => {
  const checkGame = checkCode(game);
  if(checkGame.success) {
    if(checkGame.game.hostName.toLowerCase() === playerName.toLowerCase()) return { success : false, nameClash : true }
    checkGame.game.playerTwo = playerId;
    checkGame.game.playerTwoName = playerName;
    const startWord = getRandomWord();
    checkGame.game.currentWord = startWord;
    checkGame.game.currentScrambled = scrambleWord(startWord);
    checkGame.game.gameLive = true;
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

const updateWord = (gameId) => {
  const game = games[gameId];
  if(game) {
    game.skippedWords.push({ scrambled : game.currentScrambled, word : game.currentWord});
    game.currentWord = game.currentScrambled = '';
    const newWord = getRandomWord();
    game.currentWord = newWord;
    game.currentScrambled = scrambleWord(newWord);
    return true
  } else return false
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
    const { hostScore, playerTwoScore, currentWord, skippedWords } = game;
    if(game.gameLive) {
      saveGameToDatabase(game);
    }
    game.gameLive = false;
    game.skippedWords = [];
    return { hostScore, playerTwoScore, currentWord, skippedWords }
  }
  return false;
}

const replayGame = (gameCode, id) => {
  const game = games[gameCode];
  if(game) {
    if(game.host == id) game.hostReplay = true;
    else if(game.playerTwo == id) game.playerTwoReplay = true;
    if(game.playerTwoReplay && game.hostReplay) {
      game.hostScore = 0;
      game.playerTwoScore = 0;
      game.gameLive = true;
      const newWord = getRandomWord();
      game.currentWord = newWord;
      game.currentScrambled = scrambleWord(newWord);
      game.hostReplay = game.playerTwoReplay = false;
      return { hostName : game.hostName, playerTwoName : game.playerTwoName };
    };
    return false;
  }
  return false;
}

const deleteGame = gameCode => { 
  delete games[gameCode] 
};

const saveGameToDatabase = async (game) => {
  try {
    const newGame = new Game(game);
    await newGame.save()
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createGame, checkCode, joinGame, games, guessWord, getCurrentScrambledWord, updateWord, getScores, getGameResults, replayGame, deleteGame, saveGameToDatabase }