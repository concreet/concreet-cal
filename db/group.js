var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');


var groupSchema = mongoose.Schema({
	owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	group_name: String,
	isContactList: { type: Boolean, default: false },
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

groupSchema.plugin(findOrCreate);



var Group = mongoose.model('Group', groupSchema);

module.exports = Group;