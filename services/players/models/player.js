const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    imageURL: { type: String }
  }
);

module.exports = mongoose.model('player', PlayerSchema);