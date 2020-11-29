const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  matchId: Types.ObjectId,
  matchName: String,
  stadiumNames: Array,
});

module.exports = model('Matches', schema);
