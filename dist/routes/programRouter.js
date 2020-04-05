"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var Program = require('../models/program');
/**
 * @remarks List function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.get('/', function (req, res) {
    Program.find({}, function (err, programs) {
        if (err)
            throw err;
        else
            res.send(programs);
    });
});
/**
 * @remarks Create function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.post('/', function (req, res) {
    var program = new Program(req.body);
    return Program.create(program, function (err, programs) {
        if (err)
            throw err;
        else
            res.send(programs);
    });
});
/**
 * @remarks Update function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.put('/:_id', function (req, res) {
    return Program.updateOne({ _id: req.params._id }, {
        $set: {
            programId: req.body.programId,
            programName: req.body.programName,
            room: req.body.room,
        }
    }).then(function () {
        res.status(200).json({
            message: req.body.programId + " Updated successful!"
        });
    });
});
/**
 * @remarks Delete function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.delete('/:_id', function (req, res) {
    return Program.deleteOne({ _id: req.params._id }, function (err) {
        if (err)
            throw err;
        else {
            res.status(200).json({
                message: 'Deleted successful!'
            });
        }
    });
});
module.exports = app;
