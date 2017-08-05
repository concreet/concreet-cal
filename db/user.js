var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	googleId: String,
	emailAddress: String,
	isSignedUp: {type: Boolean, default: false},
});

userSchema.plugin(findOrCreate);

var User = mongoose.model('User', userSchema);

module.exports = User;