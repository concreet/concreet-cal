var User = require('../db/user.js');
var Group = require('../db/group.js');

exports.getGroups = (user) => {
  return Group.find({owner_id: user._id, isContactList: false}).populate('contacts'); 
}

exports.getContactList = (user) => {
	return Group.findOrCreate({owner_id: user._id, isContactList: true}, {group_name: 'Contact List', isContactList: true});
}