/**
 * Created by Jens on 29-Dec-16.
 */
const mongoose = require('mongoose');
const uniqueValidation = require('mongoose-beautiful-unique-validation');
const Image = require('../images/model');

const config = require('../config');

//MAIN
let AlbumSchema = new mongoose.Schema({
    __v: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
    },
    _images: {
        type: [Image.Schema]
    }
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

module.exports = mongoose.model('Album', AlbumSchema);

module.exports.Schema = AlbumSchema;