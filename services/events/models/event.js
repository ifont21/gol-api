const mongoose = require('mongoose');
const { AuditorySchema } = require('../../shared-modules/auditory');

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    dt_event: { type: Date, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId },
    description: { type: String },
    active: { type: Boolean, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    auditory: AuditorySchema
  }
);

module.exports = mongoose.model('Event', EventSchema);