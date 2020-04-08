const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const studentRouter = require('./routes/studentRouter');
const activityRouter = require('./routes/activityRouter');
const programRouter = require('./routes/programRouter');
const teacherRouter = require('./routes/teacherRouter');
const classRouter = require('./routes/classRouter');
var db = require('./db/db');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/student', studentRouter);
app.use('/activity', activityRouter);
app.use('/programs', programRouter);
app.use('/teachers', teacherRouter);
app.use('/class', classRouter);

let port: any = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));