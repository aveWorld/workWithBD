const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  playerId: Types.ObjectId,
  playerName: String,
  teamName: String,
});

module.exports = model('Players', schema);
