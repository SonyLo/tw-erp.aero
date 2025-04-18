const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');


const User = require('./user.model');

const UserToken = sequelize.define('UserToken', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	user_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	token: {
		type: DataTypes.STRING(1000),
		allowNull: false,
	},

	user_agent: DataTypes.STRING,

	ip: DataTypes.STRING,

	is_revoked: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
}, {
	tableName: 'user_tokens',
	timestamps: true,
});

// Связь
// User.hasMany(UserToken, { foreignKey: 'user_id' });
// UserToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserToken;
