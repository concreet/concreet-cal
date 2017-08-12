var passport = require('passport');
var refresh = require('passport-oauth2-refresh');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var googleConfig = require('./passportConfig.js');
var User = require('../db/user.js');
var Group = require('../db/group.js');
var utils = require('./utils.js')


passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  done(null, user);
});

var callbackURL;
if(process.env.PORT) {
  callbackURL = 'http://concreet.date/auth/google/callback';
} else {
  callbackURL = 'http://localhost:8000/auth/google/callback';
}



var strategy = new GoogleStrategy({
		clientID: googleConfig.GOOGLE_CLIENT_ID,
		clientSecret: googleConfig.GOOGLE_CLIENT_SECRET,
		callbackURL: callbackURL,
    // callbackURL: 'http://concreet.date/auth/google/callback',
	},

	function(accessToken, refreshToken, profile, done) {
	 process.nextTick( () => {
	 	//return token and google profile
 		var auth = {
 			token: accessToken,
 			profile: profile,
 		};
 		//find on email address. If doesn't exist at all, create
    User.findOrCreate({ emailAddress: profile.emails[0].value },
    	{
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
    		isSignedUp: true,
    		googleId: profile.id,
    		accessToken: accessToken,
    	})
    	.then ( (user) => {
      	if(user.created) {
      		//user is actually in findOrCreate's weird {doc, created} object
      		//user.doc is the actual user document
      		console.log('user created');
    			if(refreshToken) user.doc.refreshToken = refreshToken;
      		return user.doc.save( function (err, user) {
						if (err) return console.error(err);
						console.log('user saved');
						return user;
    			});
      	} else {
      		console.log('user found');
      		//check to see if data updated
      		if(!user.doc.isSignedUp){
            user.doc.firstName = profile.name.givenName;
            user.doc.lastName = profile.name.familyName;
      			user.doc.isSignedUp = true;
      			user.doc.googleId = profile.id;
      			user.doc.accessToken = accessToken;
      			if(refreshToken) user.doc.refreshToken = refreshToken;
      			return user.doc.save(function (err, user) {
  						if (err) return console.error(err);
  						console.log('user saved');
  						return user;
      			});
      		} else {
            if(refreshToken) user.doc.refreshToken = refreshToken;
            user.doc.accessToken = accessToken;
            return user.doc.save( function (err, user) {
              if (err) return console.error(err);
              console.log('user saved');
              return user;
            });
      		}
    		}
    	})
      .then( (user) => {
      	//above, we pulled the user doc from its object. Now we can use it
      	//in the way we expect.
      	//return actual user record
      	auth.user = user;
      	return user;
      })
    	.then( (user) => {
    		//gets the user's contact list with contacts populated
    		return utils.getContactList(user);
    	})
    	//find contact list too
    	.then( (contactList) => {
    		//return user's contact list
    		auth.contactList = contactList;
    		return;
    	})
    	.then( () => {
    		//get all the user's groups, with contacts populated
    		return utils.getGroups(auth.user);
    	})
    	.then( (groups) => {
    		//return user's Groups
    		auth.groups = groups;
      	return done(null, auth);
    	});
    });
  }
);

passport.use(strategy);
refresh.use(strategy);

module.exports = passport;
