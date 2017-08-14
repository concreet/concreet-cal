var passport = require('passport');
var refresh = require('passport-oauth2-refresh');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var googleConfig = require('./passportConfig.js');
var User = require('../db/user.js');
var Group = require('../db/group.js');
var utils = require('./utils.js')

//serialize and deserialize return the user, required part of Passport
passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  done(null, user);
});

//determines which callback URL to use based on the port setting (8000 for local testing, 80 for production)
var callbackURL;
if(process.env.PORT) {
  callbackURL = 'http://concreet.date/auth/google/callback';
} else {
  callbackURL = 'http://localhost:8000/auth/google/callback';
}

//create the passport Google OAuth2.0 strategy
var strategy = new GoogleStrategy({
		clientID: googleConfig.GOOGLE_CLIENT_ID,
		clientSecret: googleConfig.GOOGLE_CLIENT_SECRET,
		callbackURL: callbackURL,
	},

	function(accessToken, refreshToken, profile, done) {
	 process.nextTick( () => {
	 	//return token and google profile -- may be deprecated
    //auth is the session.user object used by the client
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
        //if we MADE a new user...
      	if(user.created) {
      		//user is actually in findOrCreate's {doc, created} object
      		//user.doc is the actual user document from mongodb
      		console.log('user created');
          //if a refreshToken is received from Google, we need to save that
    			if(refreshToken) user.doc.refreshToken = refreshToken;
      		return user.doc.save( function (err, user) {
						if (err) return console.error(err);
						console.log('user saved');
						return user;
    			});
      	} else {
          //we found an existing user. Determine whether they are signed up with us or not
      		console.log('user found');
      		//if the user was NOT signed up, we need to update all of their data based on what we got from Google
      		if(!user.doc.isSignedUp){
            user.doc.firstName = profile.name.givenName;
            user.doc.lastName = profile.name.familyName;
      			user.doc.isSignedUp = true;
      			user.doc.googleId = profile.id;
      			user.doc.accessToken = accessToken;
            //if a refreshToken is received from Google, we need to save that 
      			if(refreshToken) user.doc.refreshToken = refreshToken;
      			return user.doc.save(function (err, user) {
  						if (err) return console.error(err);
  						console.log('user saved');
  						return user;
      			});
      		} else {
            //we have their data, sign them in
            //if a refreshToken is received from Google, we need to save that
              user.doc.refreshToken = refreshToken;
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
        //return the session.user
        console.log('made it to end')
      	return done(null, auth);
    	});
    });
  }
);

//tell passport and refresh to use this strategy
//refresh is used to quickly/easily get a new access token using a user's refresh token
passport.use(strategy);
refresh.use(strategy);

module.exports = passport;
