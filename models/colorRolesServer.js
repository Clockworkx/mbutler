module.exports = (sequelize, DataTypes) => {
	return sequelize.define('colorRolesServer', {
		roleId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roleName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roleHexColor: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

};
