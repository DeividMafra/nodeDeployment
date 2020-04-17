"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var Classes = require('../models/class');
/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.get('/', function (req, res) {
    Classes.find(function (err, classes) {
        if (err)
            res.end('An error ocurred trying to get the students');
        var respond = {
            code: 'Ok',
            data: classes,
            message: "The students was consulted correctly.",
        };
        res.json(respond);
    });
});
/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.post('/', function (req, res) {
    var classes = new Classes(req.body);
    console.log('=======================> ', req.body);
    Classes.create(classes, function (err, resp) {
        if (err)
            throw err;
        else {
            // res.send('La estas embarrando nayo');
            console.log('hasta aca llegamos');
            var respond = {
                data: resp,
                message: "The class was saved correctly.",
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
    Classes.updateOne({ _id: req.body._id }, {
        $set: {
            classId: req.body.classId,
            className: req.body.className,
            programs: req.body.programs
        }
    }, function (err, student) {
        if (err) {
            res.send('An error ocurred trying to save the class.');
        }
        var respond = {
            data: student,
            message: "The student was updated correctly.",
        };
        res.json(respond);
    });
});
/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.post('/delete', function (req, res) {
    Classes.deleteOne({ _id: req.body.id }, function (err, resp) {
        if (err)
            res.end('An error ocurred trying to delete the student');
        console.log('Is working perfect', resp.deletedCount);
        var respond;
        if (resp.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The class was deleted correctly.",
            };
        }
        res.json(respond);
    });
});
module.exports = router;
