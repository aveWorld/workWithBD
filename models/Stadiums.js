const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  stadiumId: Types.ObjectId,
  stadiumName: String,
  countryName: String,
  matches: Array,
});

module.exports = model('Stadiums', schema);
