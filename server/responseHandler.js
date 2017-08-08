var db = require('../db/config.js');
var User = require('../db/user.js');
var Group = require('../db/group.js');


exports.createGroup = (req, res) => {
	//takes in a request, which should contain a user, group name,
	//and maybe isContactLast
	//if no user, return error

	//if user, create a group owned by that user's _id
};

