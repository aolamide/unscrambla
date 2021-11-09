const numbers = '01234567890123456789';

const gameId = () => {
  let id = '';
  for(let i = 0; i < 6; i++) {
    id += numbers[Math.floor(Math.random() * numbers.length)]
  }
  return id;
}

module.exports = gameId;