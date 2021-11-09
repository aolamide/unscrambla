const words = [
  'hello',
  'welcome',
  'freeze',
  'parade',
  'travel',
  'stair',
  'result',
  'retail',
  'educate',
  'crate',
  'charge',
  'water',
  'phone',
  'cream',
  'bucket',
  'chart',
  'police'
];


const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const scrambleWord = word => {
  let wordToScramble = word;
  let scrambledWord = '';
  for(let i = 0; i < word.length; i++) {
    let char = wordToScramble[Math.floor(Math.random() * wordToScramble.length)];
    wordToScramble = wordToScramble.replace(char, '');
    scrambledWord += char;
  }
  if(scrambledWord === word) return scrambleWord(word);
  return scrambledWord;
}


module.exports = { getRandomWord, scrambleWord }