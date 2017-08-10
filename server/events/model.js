/**
 * Created by Jens on 29-Dec-16.
 */
const mongoose = require('mongoose');
const uniqueValidation = require('mongoose-beautiful-unique-validation');

const config = require('../config');

//MAIN
let GuestBookSchema = new mongoose.Schema({
	__v: {
		type: Number
	},
	name: {
		type: String,
		required: true,
		index: true
	},
	brewery: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: false,
	},
	degrees: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true
	},
	available: {
		type: Boolean,
		default: false
	},
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

module.exports = mongoose.model('GuestBookPost', GuestBookSchema);

module.exports.Schema = GuestBookSchema;