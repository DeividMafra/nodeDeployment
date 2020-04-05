"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var activitySchema = new Schema({
    quizId: String,
    quizName: String,
}, { collection: 'activity' } //activity collection
);
module.exports = mongoose.model('activity', activitySchema);
