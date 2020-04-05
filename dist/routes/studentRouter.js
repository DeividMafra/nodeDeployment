"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var db = require('../db/db');
router.get('/', function (req, res) {
    Student.find(function (err, students) {
        if (err)
            res.end('An error ocurred trying to get the students');
        console.log('Vamos por buen camino ', students);
        res.json(students);
    });
});
router.get('/:id', function (req, res) {
    Student.find({ "_id": req.params.id }, function (err, students) {
        if (err)
            res.end('An error ocurred trying to get the students');
        res.json(students);
    });
});
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
    student.save(function (err, student) {
        if (err) {
            res.send('La estas embarrando nayo');
        }
        console.log('los estudiantes: ', student);
        res.json(student);
    });
});
module.exports = router;
