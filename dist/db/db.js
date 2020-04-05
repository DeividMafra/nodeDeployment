"use strict";
// "use strict";
var mongoose = require('mongoose');
// local database
// mongoose.connect('mongodb://localhost:27017/Assignment1', { useNewUrlParser: true });
var uri = "mongodb+srv://nodeback:EnterpriseTech@Cluster0-xkttz.mongodb.net/Assignment1?retryWrites=true&w=majority";
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(function () { return console.log('Database Connected'); })
    .catch(function (err) { return console.log(err); });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', function () {
    // console.log(`we're connected!!!`);
});
module.exports = db;
