var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var gradeSchema = new Schema(
    {
        gradeId: String,
        gradeLetter: String,
        grade: String, 
    },
    {collection: 'grade'} //grade collection
);

module.exports = mongoose.model('grade', gradeSchema);