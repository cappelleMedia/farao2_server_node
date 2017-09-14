const BaseController = require('../util/bases/basecontroller');
const Model = require('./model');
const _ = require('lodash');

class AlbumController extends BaseController {
    constructor(model = Model) {
        super(model);
    }

    addImages(albumId, images, callback){
        //TODO find album first

        function addImage() {

        }

        _.each(images, function(image){

        });

        //TODO callback
    }

    deleteImage(album, image){

    }


}
module.exports = AlbumController;