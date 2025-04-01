import gameId from '../../helpers/gameId';
import { getRandomWord, scrambleWord } from '../../helpers/words';
import words from '../../helpers/wordList';

describe('Game Utils', () => {
  describe('generateGameCode', () => {
    it('should generate a 6-character game code', () => {
      const code = gameId();
      expect(code).toHaveLength(6);
      expect(typeof code).toBe('string');
    });
  });

  describe('scrambleWord', () => {
    it('should return a scrambled version of the input word', () => {
      const word = 'testing';
      const scrambled = scrambleWord(word);
      expect(scrambled).not.toBe(word);
      expect(scrambled.split('').sort()).toEqual(word.split('').sort());
    });
  });

  describe('getRandomWord', () => {
    it('should return a word from the word list', () => {
      const word = getRandomWord();
      const result = words.includes(word);
      expect(result).toBe(true);
    });
  });
});
