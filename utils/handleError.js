const { StatusCodes } = require('http-status-codes');

function handleError(res, err) {
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = err.message || err;
	return res.status(statusCode).json({ error: message });
}

module.exports = handleError;
