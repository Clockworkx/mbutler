const Sequelize = require('sequelize');

const sequelize = new Sequelize('mbutler_test', 'postgres', '0720', {
	host: 'localhost',
	dialect: 'postgresql',
	logging: false,
});

const Reminders = sequelize.import('models/Reminders');
sequelize.import('models/colorRoles');
sequelize.import('models/colorRolesUser');
sequelize.import('models/Points');
sequelize.import('models/colorRolesServer');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({}).then(async () => {
	// const tests = [
	// 	Reminders.upsert({ name: 'Tea', cost: 1 }),
	// 	Reminders.upsert({ name: 'Coffee', cost: 2 }),
	// 	Reminders.upsert({ name: 'Cake', cost: 5 }),
	// ];
	// await Promise.all(tests);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);

sequelize.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});
