import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const db = require('../db/db');

router.get('/', function (req: Request, res: Response) {
    
    Activity.find(function (err: Error, activities: any) {
        if (err)
            res.end('An error ocurred trying to get the activities');

        res.json(activities);
    });
});


router.get('/:id', function (req: Request, res: Response) {
    
    Activity.find({ "_id": req.params.id }, function (err: Error, activity: any) {
        if (err)
            res.end('An error ocurred trying to get the activity');
        res.json(activity);
    });
});

router.post('/delete', function (req: Request, res: Response) {
    Activity.deleteOne({ _id: req.body.id }, function (err: Error, activity: any) {
        if (err)
            res.end('An error ocurred trying to delete the activity');
        console.log('deleted one activity', activity.deletedCount);
        let respond;
        if (activity.deletedCount == 1) {
            respond = {
                data: req.body.id,
                message: "The activity was deleted correctly.",
            }
        }

        res.json(respond);
    });
});

router.post('/', function (req: Request, res: Response) {
    let activity = new Activity(req.body);
    
    activity.save((err: Error, activity: any) => {
        if (err) {
            res.send('one activity added');
        }

        console.log('one activity added: ', activity);
        res.json(activity);
    });
});

module.exports = router;