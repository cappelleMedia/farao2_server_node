/**
 * Created by Jens on 29-Dec-16.
 */

const BaseController = require('../util/bases/basecontroller');
const Model = require('./model');

class BeerController extends BaseController {
	constructor(model = Model) {
		super(model);
	}

	getAvailable(limit, skip, callback) {
		this.model
			.find({'available': true})
			.skip(skip)
			.limit(limit)
			.exec(function (err, objects) {
				if (err) {
					callback(err, 500);
				} else {
					if (!objects || !objects.length) {
						callback(err, 404);
					} else {
						callback(err, objects);
					}
				}
			});
	}

	getNotAvailable(limit, skip, callback) {
		this.model
			.find({'available': false})
			.skip(skip)
			.limit(limit)
			.exec(function (err, objects) {
				if (err) {
					callback(err, 500);
				} else {
					if (!objects || !objects.length) {
						callback(err, 404);
					} else {
						callback(err, objects);
					}
				}
			});
	}
}
module.exports = BeerController;