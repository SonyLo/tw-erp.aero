const { StatusCodes } = require('http-status-codes');
const httpMsg = require('../constants/httpMsg.constants');

function handleError(res, err) {
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = err.message || err;

	return err.name === 'SequelizeConnectionRefusedError' ? res.status(statusCode).json({ error: httpMsg.SEQUELIZE_CONNECTION_REFUSED_ERROR }) : res.status(statusCode).json({ error: message });
}

module.exports = handleError;
