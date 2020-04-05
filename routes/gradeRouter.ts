import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Grade = require('../models/grade');
const db = require('../db/db');

router.get('/', function (req: Request, res: Response) {
    
    Grade.find(function (err: Error, grades: any) {
        if (err)
            res.end('An error ocurred trying to get the grades');

        res.json(grades);
    });
});


router.get('/:id', function (req: Request, res: Response) {
    
    Grade.find({ "_id": req.params.id }, function (err: Error, grade: any) {
        if (err)
            res.end('An error ocurred trying to get the grade');
        res.json(grade);
    });
});

router.post('/delete', function (req: Request, res: Response) {
    Grade.deleteOne({ _id: req.body.id }, function (err: Error, grade: any) {
        if (err)
            res.end('An error ocurred trying to delete the grade');
        console.log('deleted one grade', grade.deletedCount);
        let respond;
        if (grade.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The grade was deleted correctly.",
            }
        }

        res.json(respond);
    });
});

router.post('/', function (req: Request, res: Response) {
    let grade = new Grade(req.body);
    
    grade.save((err: Error, grade: any) => {
        if (err) {
            res.send('one grade added');
        }

        console.log('one grade added: ', grade);
        res.json(grade);
    });
});

module.exports = router;