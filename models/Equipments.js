const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  equipmentId: Types.ObjectId,
  playerName: String,
  equipment: Array,
});

module.exports = model('Equipments', schema);
