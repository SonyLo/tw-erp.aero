const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');


const File = sequelize.define('File', {
	guid: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	origname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	file_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	path: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	mime_type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	size: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	tableName: 'files',
	timestamps: true,
});

module.exports = File;


