const mongoose = require('mongoose');
const { AuditorySchema } = require('../../shared-modules/auditory');

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    dt_event: { type: Date, required: true },
    renewable_type: { type: String },
    type: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Player' },
    description: { type: String },
    max_players: { type: Number },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    auditory: AuditorySchema
  }
);

module.exports = mongoose.model('Event', EventSchema);