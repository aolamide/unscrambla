import words from './wordList';

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const scrambleWord = (word: string) => {
  let wordToScramble = word;
  let scrambledWord = '';
  for (let i = 0; i < word.length; i++) {
    const char =
      wordToScramble[Math.floor(Math.random() * wordToScramble.length)];
    wordToScramble = wordToScramble.replace(char, '');
    scrambledWord += char;
  }
  if (scrambledWord === word) return scrambleWord(word);
  return scrambledWord;
};

export { getRandomWord, scrambleWord };
