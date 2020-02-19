module.exports = (sequelize, DataTypes) => {
	return sequelize.define('colorRolesUser', {
		DiscordUserId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		CurrentRole: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

};
