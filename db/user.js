var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	google_id: String,
	email_address: String,
	isSignedUp: {type: Boolean, default: false},
});

var User = mongoose.model('User', userSchema);

module.exports = User;