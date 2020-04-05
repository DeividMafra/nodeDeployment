var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var programSchema = new Schema(
  {
    programId: String,
    programName: String,
    room: String
  },
  { collection: 'programs' }
);

module.exports = mongoose.model('program', programSchema);