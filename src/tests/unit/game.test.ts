import { checkCode, createGame, games, joinGame } from '../../helpers/game';

const mockGameCode = '876123';
jest.mock('../../helpers/gameId', () => jest.fn(() => mockGameCode));

describe('Game functionalities', () => {
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
});
