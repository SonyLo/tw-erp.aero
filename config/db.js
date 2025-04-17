
require('dotenv').config()


// console.log(process.env.DB_CONNECTION)
const { Sequelize, Model } = require('sequelize');

// Конфигурация для первого соединения
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_CONNECTION,
	logging: false,
	timezone: '+03:00',
	retry: {
		max: 5,
		match: [/08S01/, /ER_CONNECTION_TIMEOUT/],
	},
});


module.exports = {
	sequelize
}
