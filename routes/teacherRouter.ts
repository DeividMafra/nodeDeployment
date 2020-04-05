import { Request, Response } from 'express';

const express = require('express');
const app = express();
const Teacher = require('../models/teacher');

/**
 * @remarks List function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.get('/', function (req: Request, res: Response) {
  Teacher.find({}, function (err: Error, teachers: any) {
    if (err)
      throw err;
    else
      res.send(teachers)
  });
});

/**
 * @remarks Create function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.post('/', function (req: Request, res: Response) {
  let teacher = new Teacher(req.body);

  return Teacher.create(
    teacher,
    function (err: Error, Teachers: any) {
      if (err)
        throw err;
      else
        res.send(Teachers)
    });
});

/**
 * @remarks Update function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.put('/:teacherId', (req: Request, res: Response) => {
  return Teacher.updateOne(
    { teacherId: req.params.teacherId },
    {
      $set: {
        teacherId: req.body.teacherId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        courses: req.body.courses,
      }
    }
  ).then(() => {
    res.status(200).json({
      message: `${req.body.teacherId} Updated successful!`
    });
  });
});

/**
 * @remarks Delete function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.delete('/:_id', (req: Request, res: Response) => {
  return Teacher.deleteOne({ _id: req.params._id },
    function (err: Error) {
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