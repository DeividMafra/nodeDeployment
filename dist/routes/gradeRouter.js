"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var Grade = require('../models/grade');
var db = require('../db/db');
router.get('/', function (req, res) {
    Grade.find(function (err, grades) {
        if (err)
            res.end('An error ocurred trying to get the grades');
        res.json(grades);
    });
});
router.get('/:id', function (req, res) {
    Grade.find({ "_id": req.params.id }, function (err, grade) {
        if (err)
            res.end('An error ocurred trying to get the grade');
        res.json(grade);
    });
});
router.post('/delete', function (req, res) {
    Grade.deleteOne({ _id: req.body.id }, function (err, grade) {
        if (err)
            res.end('An error ocurred trying to delete the grade');
        console.log('deleted one grade', grade.deletedCount);
        var respond;
        if (grade.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The grade was deleted correctly.",
            };
        }
        res.json(respond);
    });
});
router.post('/', function (req, res) {
    var grade = new Grade(req.body);
    grade.save(function (err, grade) {
        if (err) {
            res.send('one grade added');
        }
        console.log('one grade added: ', grade);
        res.json(grade);
    });
});
module.exports = router;
