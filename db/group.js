var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
	owner_id: {type: String, required: true},
	group_name: String,
	isContactList: {type: Boolean, default: false},
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;