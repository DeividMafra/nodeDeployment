var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teacherSchema = new Schema(
  {
    teacherId: String,
    firstName: String,
    lastName: String,
    email: String,
    courses: [String]
  },
  { collection: 'teacher' }
);

module.exports = mongoose.model('teacher', teacherSchema);