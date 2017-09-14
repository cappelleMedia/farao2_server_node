/**
 * Created by Jens on 29-Dec-16.
 */
const mongoose = require('mongoose');

const config = require('../config');
const UserHelp = require('./userhelper');

let userHelp = new UserHelp();
//FIXME adapt to project

//MAIN
let UserSchema = new mongoose.Schema({
	__v: {
		type: Number
	},
	email: {
		type: String,
		required: true,
		index: true,
		validate: userHelp.getEmailValidators()
	},
	password: {
		type: String,
		select: false,
		default: userHelp.generateRegKey(64)
	},
	regKey: {
		type: String,
		required: true,
		select: false,
		min: 64,
		max: 64,
		default: userHelp.generateRegKey(64)
	},
	isSuperAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});


//METHODS
UserSchema.methods.toTokenData = function () {
	var tokenData = {
		_id: this._id,
        email: this.email,
        isSuperAdmin: this.isSuperAdmin
	};
	return tokenData;
};

//HOOKS
UserSchema.post('validate', function () {
	if (this.isModified('password')) {
		this.password = userHelp.encryptPwd(this.password);
	}
	this.regKey = userHelp.generateRegKey(64);
});

module.exports = mongoose.model('User', UserSchema);

module.exports.Schema = UserSchema;