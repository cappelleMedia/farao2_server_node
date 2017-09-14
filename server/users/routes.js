/**
 * Created by Jens on 29-Dec-16.
 */
const Controller = require('./controller');
const helper = require('../util/routerHelper');
//FIXME adapt to project

module.exports = function (app, base) {
	let controller = new Controller();
	//BASE ROUTE OVERRIDES AND ADD-ONS

    //ADMIN DELETE METHOD
    app.delete(base + '/:id/', function (req, res) {
        if (!req.params.id || !isValidObjId(req.params.id)) {
            //TO HELP DEVELOPERS DEBUG
            helper.respond(null, 500, res, {'dev': '/' + req.params.id + '/' + ' is not a valid id'});
        } else if (!req.body.jwt || !req.body.superPwd) {
            helper.respond(null, 401);
        } else {
            Controller.delete(req.body.jwt, req.body.superPwd,req.params.id, function (err, response) {
                helper.respond(err, response, res);
            })
        }
    });

	app.get(base + '/email/:email', function (req, res) {
		controller.getFromEmail(req.params.email, '',function (err, response) {
			helper.respond(err, response, res);
		});
	});

	app.post(base + '/authenticate', function (req, res) {
		controller.authenticate(req.body.email, req.body.password, function (err, response) {
			helper.respond(err, response, res);
		});
	});

	//BASE ROUTES
	require('../util/bases/baserouter')(app, base, controller);
};