/**
 * Created by Jens on 29-Dec-16.
 */
const mongoose = require('mongoose');
const uniqueValidation = require('mongoose-beautiful-unique-validation');
const Album = require('../albums/model');
const Image = require('../images/model');

const config = require('../config');

//MAIN
let EventSchema = new mongoose.Schema({
	__v: {
		type: Number
	},
	name: {
		type: String,
		required: true,
        unique: true
	},
	desc: {
		type: String
	},
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	},
	lineup:{
	    type: [String]
    },
	_album: {
		type: Album.Schema
	},
	_headerImage: {
	    type: Image.Schema,
        required: true
	},
	sponsors:{
	    type: [String]
    },
	active: {
		type: Boolean,
		default: false
	},
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

module.exports = mongoose.model('Event', EventSchema);

module.exports.Schema = EventSchema;