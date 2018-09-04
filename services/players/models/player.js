const mongoose = require('mongoose');
const { AuditorySchema } = require('../../shared-modules/auditory');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    imageURL: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    auditory: AuditorySchema
  }
);

module.exports = mongoose.model('Player', PlayerSchema);