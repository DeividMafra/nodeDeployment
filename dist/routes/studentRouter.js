"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var Student = require('../models/student');
router.get('/', function (req, res) {
    Student.find(function (err, students) {
        if (err)
            res.end('An error ocurred trying to get the students');
        var respond = {
            code: 'Ok',
            data: students,
            message: "The students was consulted correctly.",
        };
        res.json(respond);
    });
});
router.get('/:id', function (req, res) {
    Student.find({ "_id": req.params.id }, function (err, students) {
        if (err)
            res.end('An error ocurred trying to get the students');
        res.json(students);
    });
});
/**
 * @author Diego.Perez
 */
router.post('/delete', function (req, res) {
    Student.deleteOne({ _id: req.body.id }, function (err, students) {
        if (err)
            res.end('An error ocurred trying to delete the student');
        console.log('Is working perfect', students.deletedCount);
        var respond;
        if (students.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The student was deleted correctly.",
            };
        }
        res.json(respond);
    });
});
router.post('/', function (req, res) {
    var student = new Student(req.body);
    console.log('=======================> ', req.body);
    Student.create(student, function (err, student) {
        if (err)
            throw err;
        else {
            // res.send('La estas embarrando nayo');
            var respond = {
                data: student,
                message: "The student was saved correctly.",
            };
            res.json(respond);
        }
    });
});
/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.post('/update', function (req, res) {
    //let student = new Student(req.body);
    console.log('-----------------------------> ', req.body);
    Student.updateOne({ _id: req.body._id }, {
        $set: {
            studentId: req.body.studentId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            programId: req.body.programId,
            classes: req.body.classes
        }
    }, function (err, student) {
        if (err) {
            res.send('La estas embarrando nayo en Update');
        }
        var respond = {
            data: student,
            message: "The student was updated correctly.",
        };
        res.json(respond);
    });
});
module.exports = router;
