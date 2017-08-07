// 8-3-17
// This file sets up the port and listener for the server, as well as defines server configuration
// Routing is done in ./responseHandler.js
var express = require('express');
var bodyparser = require('body-parser');
var handler = require('./responseHandler.js');
var path = require('path');
var passport = require('./passport.js')
var browserify = require('browserify-middleware');
var cors = require('cors');
var app = express();
var session = require('express-session');

app.use(express.static('static'));

app.use(cors());
app.use(bodyparser.json());
app.use(session({
	secret: 'mrspancakes',
}));
app.use(passport.initialize());
app.use(passport.session());


//Routing
app.get('/bundle.js', browserify('./client/index.js', {
  transform: [ [ require('babelify'), { presets: [ 'es2015', 'react' ] } ] ]
}));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../static/', 'index.html'));
});

app.get('/auth/google', 
	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/plus.login', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
  	//user data
  	//req._passport.session.user;
  	console.log(req.session);
  	res.redirect('/');
  }
);

app.get('/session', (req,res) => {
	res.status(200).send(req.session);
});

var port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log('Open on port: ',port);
});

