/**
 * Created by Jens on 29-Dec-16.
 */
const Controller = require('./controller');
const helper = require('../util/routerHelper');

module.exports = function (app, base) {
	let controller = new Controller();
	//BASE ROUTE OVERRIDES AND ADD-ONS
	app.get(base + '/available', function (req, res) {
		controller.getAvailable(0, 0, function (err, response, errors) {
			helper.respond(err, response, res, errors);
		});
	});

	app.get(base + '/available/:limit/:skip?', function (req, res) {
		controller.getAvailable(parseInt(req.params.limit), parseInt(req.params.skip), function (err, response, errors) {
			helper.respond(err, response, res, errors);
		});
	});

	app.get(base + '/notAvailable/:limit/:skip?', function (req, res) {
		controller.getNotAvailable(parseInt(req.params.limit), parseInt(req.params.skip), function (err, response, errors) {
			helper.respond(err, response, res, errors);
		});
	});

	//BASE ROUTES
	require('../util/bases/baserouter')(app, base, controller);
};