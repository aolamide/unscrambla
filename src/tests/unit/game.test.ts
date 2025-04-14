import {
  checkCode,
  createGame,
  games,
  guessWord,
  joinGame,
} from '../../helpers/game';
import * as wordUtils from '../../helpers/words';
import gameId from '../../helpers/gameId';

const mockGameCode = '876123';
jest.mock('../../helpers/gameId', () => jest.fn(() => mockGameCode));

describe('Game functionalities', () => {
  afterEach(() => {
    // Clear the games object after each test
    Object.keys(games).forEach((key) => {
      delete games[key];
    });
    // jest.restoreAllMocks();
  });
  describe('createGame', () => {
    it('should create a game', () => {
      const hostId = 'hostId';
      const hostName = 'hostName';
      const gameId = createGame(hostId, hostName);
      expect(gameId).toBeDefined();
      expect(gameId).toBe(mockGameCode);
      expect(games[gameId]).toBeDefined();
      expect(games[gameId]).toMatchObject({
        host: hostId,
        hostName: hostName,
        gameId: mockGameCode,
        playerTwo: '',
        playerTwoName: '',
        hostScore: 0,
        playerTwoScore: 0,
        currentWord: '',
        currentScrambled: '',
        hostReplay: false,
        playerTwoReplay: false,
        gameLive: false,
        skippedWords: [],
      });
    });

    it('should regenerate game code if it already exists', () => {
      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);

      const newGameCode = '123456';
      // Configure second call to return a different game code
      (gameId as jest.Mock)
        .mockImplementationOnce(() => mockGameCode)
        .mockImplementationOnce(() => newGameCode);

      const newGameId = createGame(hostId, hostName);
      expect(newGameId).toBeDefined();
      expect(newGameId).not.toBe(mockGameCode);
      expect(games[newGameId]).toBeDefined();
      expect(games[newGameId]).toMatchObject({
        host: hostId,
        hostName: hostName,
        gameId: newGameCode,
        playerTwo: '',
        playerTwoName: '',
        hostScore: 0,
        playerTwoScore: 0,
        currentWord: '',
        currentScrambled: '',
        hostReplay: false,
        playerTwoReplay: false,
        gameLive: false,
        skippedWords: [],
      });
    });
  });

  describe('checkCode', () => {
    it('should return game not found if invalid code is used.', () => {
      const result = checkCode('111111');
      expect(result.success).toBe(false);
      expect(result.msg).toBe('Game not found.');
    });

    it('should return success and game data if valid code is used.', () => {
      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);
      const result = checkCode(mockGameCode);
      expect(result.success).toBe(true);
      expect(result.game).toBeDefined();
      expect(result.game).toMatchObject({
        host: hostId,
        hostName: hostName,
        gameId: mockGameCode,
        playerTwo: '',
        playerTwoName: '',
        hostScore: 0,
        playerTwoScore: 0,
        currentWord: '',
        currentScrambled: '',
        hostReplay: false,
        playerTwoReplay: false,
        gameLive: false,
        skippedWords: [],
      });
    });

    it('should return game already has two players error if game is full.', () => {
      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);
      const playerId = 'playerId';
      const playerName = 'playerName';
      joinGame(playerId, playerName, mockGameCode);
      const result = checkCode(mockGameCode);
      expect(result.success).toBe(false);
      expect(result.msg).toBe('Game already has two players.');
    });
  });

  describe('joinGame', () => {
    it('should join a game successfully', () => {
      const word = 'scale';
      const scrambledWord = 'lceas';
      jest.spyOn(wordUtils, 'getRandomWord').mockReturnValue(word);
      jest.spyOn(wordUtils, 'scrambleWord').mockReturnValue(scrambledWord);

      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);
      const playerId = 'playerId';
      const playerName = 'playerName';
      const result = joinGame(playerId, playerName, mockGameCode);
      expect(result.success).toBe(true);
      expect(result.game).toBeDefined();
      expect(result.game).toMatchObject({
        host: hostId,
        hostName: hostName,
        playerTwo: playerId,
        playerTwoName: playerName,
        gameId: mockGameCode,
        currentWord: word,
        currentScrambled: scrambledWord,
        gameLive: true,
      });
    });

    it('should return name clash error if player name is same as host name.', () => {
      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);
      const playerId = 'playerId';
      const result = joinGame(playerId, hostName, mockGameCode);
      expect(result.success).toBe(false);
      expect(result.nameClash).toBe(true);
    });

    it('should return game not found error if invalid code is used.', () => {
      const playerId = 'playerId';
      const playerName = 'playerName';
      const result = joinGame(playerId, playerName, 'invalidCode');
      expect(result.success).toBe(false);
      expect(result.msg).toBe('Game not found.');
    });
  });

  describe('guessWord', () => {
    it('should return true and update host scores if guessed word is correct', () => {
      const word = 'place';
      const scrambledWord = 'clape';
      jest.spyOn(wordUtils, 'getRandomWord').mockReturnValue(word);
      jest.spyOn(wordUtils, 'scrambleWord').mockReturnValue(scrambledWord);

      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);
      const playerId = 'playerId';
      const playerName = 'playerName';
      joinGame(playerId, playerName, mockGameCode);
      const result = guessWord(word, mockGameCode, hostId);
      expect(result).toBe(true);
      expect(games[mockGameCode].hostScore).toBe(1);
    });

    it('should return true and update playerTwo score if guessed word is correct', () => {
      const word = 'scale';
      const scrambledWord = 'lceas';
      jest.spyOn(wordUtils, 'getRandomWord').mockReturnValue(word);
      jest.spyOn(wordUtils, 'scrambleWord').mockReturnValue(scrambledWord);

      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);
      const playerId = 'playerId';
      const playerName = 'playerName';
      joinGame(playerId, playerName, mockGameCode);
      const result = guessWord(word, mockGameCode, playerId);
      expect(result).toBe(true);
      expect(games[mockGameCode].playerTwoScore).toBe(1);
    });

    it('should return false if guessed word is incorrect', () => {
      const word = 'scale';
      const scrambledWord = 'lceas';
      jest.spyOn(wordUtils, 'getRandomWord').mockReturnValue(word);
      jest.spyOn(wordUtils, 'scrambleWord').mockReturnValue(scrambledWord);

      const hostId = 'hostId';
      const hostName = 'hostName';
      createGame(hostId, hostName);
      const playerId = 'playerId';
      const playerName = 'playerName';
      joinGame(playerId, playerName, mockGameCode);
      const result = guessWord('wrongword', mockGameCode, hostId);
      expect(result).toBe(false);
    });
  });
});
