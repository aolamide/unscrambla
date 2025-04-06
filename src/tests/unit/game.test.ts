import { createGame, games } from '../../helpers/game';

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
});
