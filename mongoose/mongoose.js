const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();

mongoose.Promise = global.Promise;

const options = config.get('DB.options');

mongoose.connect(
	config.get('DB.mongoURI'),
	{
		...options,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS
	}
).then(() => {
	console.log('Database ready to use ...');
});

mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${mongoURI}`);
});

module.exports = { mongoose };