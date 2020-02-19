module.exports = (sequelize, DataTypes) => {
	return sequelize.define('colorRoles', {
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
