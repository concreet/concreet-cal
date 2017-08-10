var User = require('../db/user.js');
var Group = require('../db/group.js');

exports.getGroups = (user) => {
	//finds the groups owned by this user, which are not the contact list, and populates their contacts
  return Group.find({owner_id: user._id, isContactList: false}).populate('contacts'); 
}

exports.getContactList = (user) => {
	//finds (or creates) the contact list for this user then populates its contacts
	return Group.findOrCreate(
		{owner_id: user._id, isContactList: true}, 
		{group_name: 'Contact List', isContactList: true} 
	)
	.then( (findOrCreate) => {
		return group = findOrCreate.doc;
	})
	.then( (group) => {
		return group.populate('contacts').execPopulate();
	});
};

