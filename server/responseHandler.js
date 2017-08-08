var db = require('../db/config.js');
var User = require('../db/user.js');
var Group = require('../db/group.js');


exports.createGroup = (req, res) => {
	//takes in a request, which should contain a user, group name,
	//and maybe isContactLast

	//INPUTS
	//req.body = { user: ~, groupName: ~, isContactList: ~}
	if(!req.body.user) {
		//if no user, return error
		res.status(403).send('No user passed down');
	} else {
		//if user, create a group owned by that user's _id
		var newGroup = new Group({
			owner_id: req.body.user._id,
			group_name: req.body.groupName,
			isContactList: false,
		});

		//send 200 on successful save
		newGroup.save(function(err) {
			if(err) res.status(400).send(err);
			res.sendStatus(200);
		});
	}
};

//will findOrCreate a user based on email address
//if that user is created, it is created with isVerified = false
exports.addOrFindUser = (req, res) => {
	//INPUTS
	//req.params.email
	console.log(req.params.email)
	User.findOrCreate( { emailAddress: req.params.email } )
	.then( (user) => {
		res.status(200).send(user.doc);
	} );
};

