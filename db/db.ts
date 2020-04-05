// "use strict";
var mongoose = require('mongoose');
// local database
// mongoose.connect('mongodb://localhost:27017/Assignment1', { useNewUrlParser: true });
const uri = "mongodb+srv://nodeback:EnterpriseTech@Cluster0-xkttz.mongodb.net/Assignment1?retryWrites=true&w=majority";
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch((err: any) => console.log(err));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', function () {
    // console.log(`we're connected!!!`);
});
module.exports = db;