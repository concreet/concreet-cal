# concreet-cal
Finds available meeting times and allows quick sending of gcal invites to attendees


- Server Start
Start a mongo instance (brew services start mongo)
Start a Node server by running npm start, or node index.js

- Server
	- index.js == 
		runs the server
	- server.js == 
			creates the session 
			launches passport
			sets up routing
			starts the server
	- passport.js == 
		sets up Google OAuth2.0
		handles user login process and initial data creation/verification
			A new user has a new User record created and filled in with appropriate details. 
			A user whose email was in-system from an Add Contact, but had not logged in yet, has their details updated and is verified. 
			A normal user is logged in. 
			Contact List and Groups Lists are returned to the client.
	- passportConfig.js ==
		contains google client ID and google secret
	- responseHandler.js == 
		handles all GET/POST requests from server routing
		finds, creates groups and contact
		refreshes tokens using a user's refreshToken
		logout
	- utils.js == 
		contains functions for retrieving user groups and contact list, used in several places
	
- Database 
	- config.js ==
		configures the database connection to local mongodb
	- group.js ==
		configures Group documents
			owner_id pointing to User
			group_name
			isContactList boolean to denote contact lists from regular groups
			contacts array pointing to users contained by a group
	- user.js ==
		configures User documents
			uses findOrCreate module to creature users if not found
			users contain
				googleId
				emailAddress
				isSignedUp boolean to determine validation of account (we need permission to access calendars, so this lets us only interact with people who have given us permissions)
				accessToken for making API calls
				refreshToken for generating new access tokens as needed

