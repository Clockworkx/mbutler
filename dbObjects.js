const Sequelize = require('sequelize');

const sequelize = new Sequelize('mbutler_test', 'postgres', '0720', {
	host: 'localhost',
	dialect: 'postgresql',
	logging: false,
});

const Reminder = sequelize.import('models/Reminders')

module.exports = { Reminder }