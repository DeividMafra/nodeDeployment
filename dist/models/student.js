"use strict";
var mongoose = require('mongoose');
// var classSchema = require('./class').classSchema;
var Schema = mongoose.Schema;
var studentSchema = new Schema({
    studentId: String,
    firstName: String,
    lastName: String,
    email: String,
    programId: String,
    classes: [String]
}, { collection: 'student' } //This is the name of the collection that we want to use
);
module.exports = mongoose.model('student', studentSchema);
