import { Request, Response } from 'express';

const express = require('express');
const app = express();
const Program = require('../models/program');

/**
 * @remarks List function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.get('/', function (req: Request, res: Response) {
  Program.find({}, function (err: Error, programs: any) {
    if (err)
      throw err;
    else
      res.send(programs)
  });
});

/**
 * @remarks Create function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.post('/', function (req: Request, res: Response) {
  let program = new Program(req.body);

  return Program.create(
    program,
    function (err: Error, programs: any) {
      if (err)
        throw err;
      else
        res.send(programs)
    });
});

/**
 * @remarks Update function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.put('/:_id', (req: Request, res: Response) => {
  return Program.updateOne(
    { _id: req.params._id },
    {
      $set: {
        programId: req.body.programId,
        programName: req.body.programName,
        room: req.body.room,
      }
    }
  ).then(() => {
    res.status(200).json({
      message: `${req.body.programId} Updated successful!`
    });
  });
});

/**
 * @remarks Delete function;
 * @date 03/31/2020;
 * @author Deivid Mafra;
 */
app.delete('/:_id', (req: Request, res: Response) => {
  return Program.deleteOne({ _id: req.params._id },
    function (err: Error) {
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