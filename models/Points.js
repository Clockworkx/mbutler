module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Points', {
		DiscordUserId: {
			type: DataTypes.STRING,
            allowNull: false,
		},
		Points: {
			type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
		},
	}, {
		timestamps: false,
	});

};
