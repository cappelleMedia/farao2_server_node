const Controller = require('./controller');
const helper = require('../util/routerHelper');

module.exports = function (app, base) {
    let controller = new Controller();
    //BASE ROUTE OVERRIDES AND ADD-ONS

    app.post(base + 'add-images', function(req, res) {
       controller.addImages(req.body.albumId, req.body.images, function(err, response){
           helper.respond(err, response, res)
       })
    });

    //TODO get Album By Name
    //TODO get Album By Event

    //BASE ROUTES
    require('../util/bases/baserouter')(app, base, controller);
};