const Sequelize = require('sequelize');

const sequelize = new Sequelize('mbutler_test', 'postgres', '0720', {
	host: 'localhost',
	dialect: 'postgresql',
	logging: false,
});

const Reminder = sequelize.import('models/Reminders')
const colorRolesDb = sequelize.import('models/colorRoles')
const colorRolesUser = sequelize.import('models/colorRolesUser')
const Points = sequelize.import('models/Points')

module.exports = { Reminder, colorRolesDb, colorRolesUser, Points }
