const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  teamId: Types.ObjectId,
  teamName: String,
});

module.exports = model('Teams', schema);
