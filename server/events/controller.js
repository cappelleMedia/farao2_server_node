/**
 * Created by Jens on 29-Dec-16.
 */

const BaseController = require('../util/bases/basecontroller');
const Model = require('./model');

class EventController extends BaseController {
	constructor(model = Model) {
		super(model);
	}

	getActive(limit, skip, callback) {
		this.model
			.find({'active': true})
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

	getNotActive(limit, skip, callback) {
		this.model
			.find({'active': false})
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

	getPast(limit, skip, callback) {
		//TODO implement
	}
}
module.exports = EventController;