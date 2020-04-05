"use strict";
var mongoose = require('mongoose');
var classSchema = new mongoose.Schema({
    classId: String,
    className: String
});
var Class = mongoose.model('Class', classSchema);
module.exports = { classSchema: classSchema, Class: Class };
