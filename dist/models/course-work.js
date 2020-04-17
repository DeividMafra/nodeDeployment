"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var courseWorkSchema = new Schema({
    Id: String,
    name: String,
    percentage: String,
    course: String,
    dueDate: String,
}, { collection: 'course_work' });
module.exports = mongoose.model('course-work', courseWorkSchema);
