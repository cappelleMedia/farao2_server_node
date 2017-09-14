/**
 * Created by Jens on 29-Jun-17.
 */
module.exports = function (app) {
	//api routes
	let base = '/api/v1/';
	require('./beers/routes')(app, base + 'beers');
	require('./events/routes')(app, base + 'events');
	require('./images/routes')(app, base + 'images');
	require('./albums/routes')(app, base + 'albums');

	// require('./photos/routes')(app, base + 'photos');
	// require('./guestbook/routes')(app, base + 'gbps');
	require('./users/routes')(app, base + 'users');
};