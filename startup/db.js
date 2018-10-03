const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
	const dbPath = config.get('db');
	mongoose.connect(dbPath, {
		useNewUrlParser: true,
		useCreateIndex: true
	}).then(() => winston.info(`Connected to ${dbPath}...`));
}