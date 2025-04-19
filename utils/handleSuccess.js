const { StatusCodes } = require('http-status-codes');

function handleSuccess(res, data, status = StatusCodes.OK) {
	res.status(status).json(data);
}

module.exports = handleSuccess;
