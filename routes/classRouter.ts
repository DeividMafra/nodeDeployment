import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Classes = require('../models/class');

/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.get('/', function (req: Request, res: Response) {

    Classes.find(function (err: Error, classes: any) {
        if (err)
            res.end('An error ocurred trying to get the students');

        let respond = {
            code: 'Ok',
            data: classes,
            message: "The students was consulted correctly.",
        }

        res.json(respond);
    });
});

/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.post('/', function (req: Request, res: Response) {
    let classes = new Classes(req.body);
    console.log('=======================> ', req.body);
    Classes.create(classes, (err: Error, resp: any) => {
        if (err)
            throw err;
        else {
            // res.send('La estas embarrando nayo');
            console.log('hasta aca llegamos');
            let respond = {
                data: resp,
                message: "The class was saved correctly.",
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
    Classes.updateOne(
        { _id: req.body._id },
        {
            $set: {
                classId: req.body.classId,
                className: req.body.className,
                programs: req.body.programs
            }
        },
        (err: Error, student: any) => {
            if (err) {
                res.send('An error ocurred trying to save the class.');
            }

            let respond = {
                data: student,
                message: "The student was updated correctly.",
            }
            res.json(respond);
        });
});

/**
 * @author Diego.Perez
 * @date 04/05/2020
 */
router.post('/delete', function (req: Request, res: Response) {
    Classes.deleteOne({ _id: req.body.id }, function (err: Error, resp: any) {
        if (err)
            res.end('An error ocurred trying to delete the student');

        console.log('Is working perfect', resp.deletedCount);
        let respond;
        if (resp.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The class was deleted correctly.",
            }
        }

        res.json(respond);
    });
});


module.exports = router;