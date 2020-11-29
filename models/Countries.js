const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  countryId: Types.ObjectId,
  name: String,
});

module.exports = model('Countries', schema);
