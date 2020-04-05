import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const db = require('../db/db');

router.get('/', function (req: Request, res: Response) {
    
    Student.find(function (err: Error, students: any) {
        if (err)
            res.end('An error ocurred trying to get the students');

        console.log('Vamos por buen camino ', students);
        res.json(students);
    });
});

router.get('/:id', function (req: Request, res: Response) {
    
    Student.find({ "_id": req.params.id }, function (err: Error, students: any) {
        if (err)
            res.end('An error ocurred trying to get the students');
        res.json(students);
    });
});

router.post('/delete', function (req: Request, res: Response) {
    Student.deleteOne({ _id: req.body.id }, function (err: Error, students: any) {
        if (err)
            res.end('An error ocurred trying to delete the student');

        console.log('Is working perfect', students.deletedCount);
        let respond;
        if (students.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The student was deleted correctly.",
            }
        }

        res.json(respond);
    });
});

router.post('/', function (req: Request, res: Response) {
    let student = new Student(req.body);
    
    student.save((err: Error, student: any) => {
        if (err) {
            res.send('La estas embarrando nayo');
        }

        console.log('los estudiantes: ', student);
        res.json(student);
    });
});

module.exports = router;