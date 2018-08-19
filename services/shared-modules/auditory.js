const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuditorySchema = new Schema(
  {
    dt_created: { type: Date, required: true },
    dt_updated: { type: Date, required: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true },
  }
);

module.exports = {
  AuditorySchema
};