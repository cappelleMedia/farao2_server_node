/**
 * Created by Jens on 29-Jun-17.
 */
const winston = require('winston'),
    config = require('./config'),
    ConnectionHandler = require('./util/connection-handler');

let connectionHandler = new ConnectionHandler,
    db,
    app;

run();

function run() {
    app = connectionHandler.expressSetup();
    require('./routes')(app);
    let server = app.listen(3000, function () {
        let mode = ' in ' + process.env.NODE_ENV || 'development' + ' mode';
        winston.info('Project FARAO running on port 3000' + mode);
    });

    db = connectionHandler.mongoSetup();
}