import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/', function (req: Request, res: Response) {

    Student.find(function (err: Error, students: any) {
        if (err)
            res.end('An error ocurred trying to get the students');

        let respond = {
            code: 'Ok',
            data: students,
            message: "The students was consulted correctly.",
        }

        res.json(respond);
    });
});

router.get('/:id', function (req: Request, res: Response) {

    Student.find({ "_id": req.params.id }, function (err: Error, students: any) {
        if (err)
            res.end('An error ocurred trying to get the students');
        res.json(students);
    });
});

/**
 * @author Diego.Perez
 */
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
    console.log('=======================> ', req.body);
    Student.create(student, (err: Error, student: any) => {
        if (err)
            throw err;
        else {
            // res.send('La estas embarrando nayo');

            let respond = {
                data: student,
                message: "The student was saved correctly.",
            }
            res.json(respond);
        }
    });
});

/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.post('/update', function (req: Request, res: Response) {
    //let student = new Student(req.body);
    console.log('-----------------------------> ', req.body);
    Student.updateOne(
        { _id: req.body._id },
        {
            $set: {
                studentId: req.body.studentId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                programId: req.body.programId,
                classes: req.body.classes
            }
        },
        (err: Error, student: any) => {
            if (err) {
                res.send('La estas embarrando nayo en Update');
            }

            let respond = {
                data: student,
                message: "The student was updated correctly.",
            }
            res.json(respond);
        });
});

module.exports = router;