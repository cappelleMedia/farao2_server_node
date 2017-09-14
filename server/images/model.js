/**
 * Created by Jens on 29-Dec-16.
 */
const mongoose = require('mongoose');
const uniqueValidation = require('mongoose-beautiful-unique-validation');

const config = require('../config');

//MAIN
let ImageSchema = new mongoose.Schema({
    __v: {
        type: Number
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: false
    }
}, {autoIndex: config.mongo.autoIndex, id: false, read: 'secondaryPreferred'});

module.exports = mongoose.model('Image', ImageSchema);

module.exports.Schema = ImageSchema;