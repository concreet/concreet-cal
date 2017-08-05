var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = require('./passportConfig.js');
var User = require('../db/user.js');


passport.use(new GoogleStrategy({
		clientID: googleConfig.GOOGLE_CLIENT_ID,
		clientSecret: googleConfig.GOOGLE_CLIENT_SECRET,
		callbackURL: 'http://localhost:8000/auth/google/callback',
	},

	function(token, tokenSecret, profile, done) {

	 process.nextTick( () => {
      return done(null, profile);
    });
      // console.log('hello, steve');
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
  }
));

module.exports = passport;

