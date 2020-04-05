"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var studentRouter = require('./routes/studentRouter');
var activityRouter = require('./routes/activityRouter');
var programRouter = require('./routes/programRouter');
var teacherRouter = require('./routes/teacherRouter');
var db = require('./db/db');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/student', studentRouter);
app.use('/activity', activityRouter);
app.use('/programs', programRouter);
app.use('/teachers', teacherRouter);
var port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function () { return console.log("Listening on http://localhost:" + port + "/"); });
