"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var CourseWork = require('../models/course-work');
//const db = require('../db/db');
router.get('/', function (req, res) {
    CourseWork.find(function (err, courseWork) {
        if (err)
            res.end('An error ocurred trying to get the course work');
        res.json(courseWork);
    });
});
router.get('/:id', function (req, res) {
    CourseWork.find({ "_id": req.params.id }, function (err, courseWork) {
        if (err)
            res.end('An error ocurred trying to get the Course Work');
        res.json(courseWork);
    });
});
router.post('/delete', function (req, res) {
    CourseWork.deleteOne({ _id: req.body.id }, function (err, courseWork) {
        if (err)
            res.end('An error ocurred trying to delete the course work');
        console.log('deleted one courseWork', courseWork.deletedCount);
        var respond;
        if (courseWork.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The courseWork was deleted correctly.",
            };
        }
        res.json(respond);
    });
});
router.post('/', function (req, res) {
    var courseWork = new CourseWork(req.body);
    courseWork.save(function (err, rpt) {
        if (err) {
            res.send('one courseWork added');
        }
        console.log('one courseWork added: ', rpt);
        res.json(rpt);
    });
});
router.put('/:_id', function (req, res) {
    return CourseWork.updateOne({ _id: req.params._id }, {
        $set: {
            name: req.body.name,
            percentage: req.body.percentage,
            course: req.body.course,
            dueDate: req.body.dueDate,
        }
    }).then(function () {
        res.status(200).json({
            message: req.body._id + " Updated successful!"
        });
    });
});
router.delete('/:_id', function (req, res) {
    return CourseWork.deleteOne({ _id: req.params._id }, function (err) {
        if (err)
            throw err;
        else {
            res.status(200).json({
                message: 'Deleted successful!'
            });
        }
    });
});
module.exports = router;
