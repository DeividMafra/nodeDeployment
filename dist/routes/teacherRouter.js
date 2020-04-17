"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var Teacher = require('../models/teacher');
/**
 * @remarks List function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.get('/', function (req, res) {
    Teacher.find({}, function (err, teachers) {
        if (err)
            throw err;
        else
            res.send(teachers);
    });
});
/**
 * @remarks Create function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.post('/', function (req, res) {
    var teacher = new Teacher(req.body);
    return Teacher.create(teacher, function (err, Teachers) {
        if (err)
            throw err;
        else
            res.send(Teachers);
    });
});
/**
 * @remarks Update function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.put('/:_id', function (req, res) {
    return Teacher.updateOne({ _id: req.params._id }, {
        $set: {
            teacherId: req.body.teacherId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            courses: req.body.courses,
        }
    }).then(function () {
        res.status(200).json({
            message: req.body.teacherId + " Updated successful!"
        });
    });
});
/**
 * @remarks Delete function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.delete('/:_id', function (req, res) {
    return Teacher.deleteOne({ _id: req.params._id }, function (err) {
        if (err)
            throw err;
        else {
            res.status(200).json({
                message: ' Deleted successful!'
            });
        }
    });
});
module.exports = app;
