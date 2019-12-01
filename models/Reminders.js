module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Reminder', {
		discord_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reminder_content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		is_reminded: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

};
