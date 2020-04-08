var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var classSchema = new Schema(
    {
        classId: String,
        className: String,
        programs: [String]
    },
    {collection: 'class'}
);

module.exports = mongoose.model('class', classSchema);
