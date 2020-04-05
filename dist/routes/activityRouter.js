"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');
var db = require('../db/db');
router.get('/', function (req, res) {
    Activity.find(function (err, activities) {
        if (err)
            res.end('An error ocurred trying to get the activities');
        res.json(activities);
    });
});
router.get('/:id', function (req, res) {
    Activity.find({ "_id": req.params.id }, function (err, activity) {
        if (err)
            res.end('An error ocurred trying to get the activity');
        res.json(activity);
    });
});
router.post('/delete', function (req, res) {
    Activity.deleteOne({ _id: req.body.id }, function (err, activity) {
        if (err)
            res.end('An error ocurred trying to delete the activity');
        console.log('deleted one activity', activity.deletedCount);
        var respond;
        if (activity.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The activity was deleted correctly.",
            };
        }
        res.json(respond);
    });
});
router.post('/', function (req, res) {
    var activity = new Activity(req.body);
    activity.save(function (err, activity) {
        if (err) {
            res.send('one activity added');
        }
        console.log('one activity added: ', activity);
        res.json(activity);
    });
});
module.exports = router;
