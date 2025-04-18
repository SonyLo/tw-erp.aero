const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');


const BlackListToken = sequelize.define('File', {
	token: {
		type: DataTypes.STRING,
		allowNull: false,
	},

}, {
	tableName: 'black_list_token',
	timestamps: true,
});

module.exports = File;


