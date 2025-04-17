const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.js'); // Подключаем sequelize

const User = sequelize.define('User', {
	uuid: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id: { // email или телефон
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password_hash: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	tableName: 'users',
	timestamps: true,
});

module.exports = User;
