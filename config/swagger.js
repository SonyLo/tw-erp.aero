const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Api',
			version: '1.0.0',
		},
	},
	apis: ['./src/routes/*.js'],
};

const swagger = swaggerJsdoc(options);
module.exports = {
	swagger,
	swaggerUi,
}