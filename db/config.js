// 8-3-17
// This file creates the MongoDB configuration. 
// One setting I have consistently found useful was to set reconnect tries to max value.
// mongoose promises are deprecated, setting global promise and mongoose promise to bluebird library
var mongoose = require('mongoose');
global.Promise = require('bluebird');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/data/db', {
	server: {reconnectTries: Number.MAX_VALUE}
});

var db = mongoose.connection();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection open');
});

module.exports = db;