var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = require('./passportConfig.js');
var User = require('../db/user.js');
var Group = require('../db/group.js');


passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
		clientID: googleConfig.GOOGLE_CLIENT_ID,
		clientSecret: googleConfig.GOOGLE_CLIENT_SECRET,
		callbackURL: 'http://localhost:8000/auth/google/callback',
	},

	function(token, tokenSecret, profile, done) {
	 process.nextTick( () => {
	 	//return token and google profile
	 		var auth = {
	 			token: token,
	 			profile: profile,
	 		};
      User.findOrCreate({ googleId: profile.id }, {isSignedUp: true}, function (err, user) {
      	console.log('user created or found');
      	//return actual user record
      	auth.user = user;
      	//find contact list too
      	Group.findOrCreate({owner_id: user._id, isContactList: true}, {group_name: 'Contact List', isContactList: true})
      	.then((contactList) => {
      		//return user's contact list
      		auth.contactList = contactList;
      	})
      	.then( Group.find({owner_id: user._id, isContactList: false}) )
      	.then( (groups) => {
      		//return user's Groups
      		auth.groups = groups;
	      	return done(null, auth);
      	});
      });
    });
  }
));

module.exports = passport;

