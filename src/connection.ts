import {
  createGame,
  checkCode,
  joinGame,
  guessWord,
  getCurrentScrambledWord,
  getScores,
  getGameResults,
  replayGame,
  deleteGame,
  updateWord,
} from './helpers/game';
import { Server } from 'socket.io';
import { IJoinGame, IPlayerTry } from './types/game.types';
import { ISocket } from './types/socket-io.types';

const IOSetup = function (io: Server) {
  let interval: NodeJS.Timeout;
  io.on('connection', (socket: ISocket) => {
    socket.on('createGame', async (host: string) => {
      const gameId = createGame(socket.id, host);
      await socket.join(gameId);
      socket.data.gameCode = gameId;
      socket.emit('gameCreated', gameId);
    });

    socket.on('checkCode', (code: string) => {
      const result = checkCode(code);
      socket.emit('checkCodeResult', result);
    });

    socket.on('joinGame', async ({ playerName, gameCode }: IJoinGame) => {
      const result = joinGame(socket.id, playerName, gameCode);
      if (result.success && result.game) {
        socket.data.gameCode = gameCode;
        await socket.join(gameCode);
        io.to(gameCode).emit('gameReady', {
          host: result.game.hostName,
          playerTwo: result.game.playerTwoName,
        });
        setTimeout(() => {
          io.to(gameCode).emit('gameStarted');
          io.to(gameCode).emit(
            'adminMessage',
            `Game is live. Unscramble the first word.`,
          );
          interval = setInterval(() => {
            updateWord(gameCode);
            io.to(gameCode).emit(
              'newScrambledWord',
              getCurrentScrambledWord(gameCode),
            );
          }, 30 * 1000); //change word after 30 seconds if no player guesses it

          setTimeout(
            () => {
              io.to(gameCode).emit('gameEnded', getGameResults(gameCode));
              clearInterval(interval);
            },
            1000 * 60 * 3,
          ); //3 minutes
        }, 1000 * 5); //5 seconds
      } else {
        if (result.nameClash) {
          socket.emit('nameClash');
        } else {
          socket.emit('checkCodeResult', result);
        }
      }
    });

    socket.on('replay', (gameCode: string) => {
      const startReplay = replayGame(gameCode, socket.id);
      if (startReplay) {
        io.to(gameCode).emit('gameReady', {
          host: startReplay.hostName,
          playerTwo: startReplay.playerTwoName,
        });
        setTimeout(() => {
          io.to(gameCode).emit('gameStarted');
          io.to(gameCode).emit(
            'adminMessage',
            `Game is live. Unscramble the first word.`,
          );

          interval = setInterval(() => {
            updateWord(gameCode);
            io.to(gameCode).emit(
              'newScrambledWord',
              getCurrentScrambledWord(gameCode),
            );
          }, 30 * 1000); //change word after 30 seconds if no player guesses it

          setTimeout(
            () => {
              io.to(gameCode).emit('gameEnded', getGameResults(gameCode));
              clearInterval(interval);
            },
            1000 * 60 * 3,
          );
        }, 1000 * 5);
      }
    });

    socket.on('playerTry', ({ wordPick, gameCode, userName }: IPlayerTry) => {
      socket.broadcast.to(gameCode).emit('opponentTry', wordPick);
      const result = guessWord(wordPick, gameCode, socket.id);
      if (result) {
        io.to(gameCode).emit(
          'adminMessage',
          `${wordPick} is correct. Great job ${userName}!✔`,
        );
        io.to(gameCode).emit(
          'newScrambledWord',
          getCurrentScrambledWord(gameCode),
        );
        if (interval) {
          clearInterval(interval);
        }
        interval = setInterval(() => {
          updateWord(gameCode);
          io.to(gameCode).emit(
            'newScrambledWord',
            getCurrentScrambledWord(gameCode),
          );
        }, 30 * 1000); //change word after 30 seconds if no player guesses it
        io.to(gameCode).emit('scoreUpdate', getScores(gameCode));
      } else {
        io.to(gameCode).emit(
          'adminMessage',
          `${wordPick} is wrong. Try again ${userName}❌`,
        );
      }
    });

    socket.on('getScrambledWord', (gameCode: string) => {
      io.to(gameCode).emit(
        'newScrambledWord',
        getCurrentScrambledWord(gameCode),
      );
    });

    socket.on('disconnect', () => {
      if (socket.data.gameCode) {
        io.to(socket.data.gameCode).emit('playerDisconnected');
        io.to(socket.data.gameCode).emit(
          'gameEnded',
          getGameResults(socket.data.gameCode),
        );
        deleteGame(socket.data.gameCode);
        io.socketsLeave(socket.data.gameCode);
      }
    });
  });
};

export default IOSetup;
