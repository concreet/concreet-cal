// 8-3-17
// This file sets up the port and listener for the server, as well as defines server configuration
// Routing is done in ./responseHandler.js
var express = require('express');
var bodyparser = require('body-parser');
var handler = require('./responseHandler.js');
var path = require('path');
var passport = require('./passport.js')
var browserify = require('browserify-middleware');

var app = express();
app.use(express.static(__dirname + '..'));
// serve static files
// app.get( (req, res) => {
// 	res.sendFile(__dirname )
// } );

app.get('/bundle.js', browserify('./client/index.js', {
  transform: [ [ require('babelify'), { presets: [ 'es2015', 'react' ] } ] ]
}));



app.get('/', (req, res) => {
	//res.sendFile('/Users/BChilds/Desktop/concreet-cal/index.html');
	res.sendFile(path.join(__dirname, '../', 'index.html'));

}  );


var port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log('Open on port: ',port);
});

