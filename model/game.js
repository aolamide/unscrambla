const mongoose = require('mongoose')


const gameSchema = new mongoose.Schema({
  host : String,
  hostName : String,
  playerTwo : String,
  playerTwoName : String,
  hostScore : Number,
  playerTwoScore : Number,
  gameId : String,
}, {
  timestamps : true, versionKey : false
})


const Game = mongoose.model('Games', gameSchema)

module.exports = Game