const { StatusCodes } = require('http-status-codes');

const { UserToken } = require('../models/index')
const BlackListToken = require('../src/models/blackListToken.model')

const httpError = require('./httpError')

const httpMsg = require('../constants/httpMsg.constants')

module.exports.checkAccsesBlackList = async (token) => {

	if (!token) {
		return httpError(httpMsg.ACCSES_TOKEN_EMPTY, StatusCodes.BAD_REQUEST)
	}

	const candidat = await BlackListToken.findOne({
		where: {
			token: token
		}
	})

	if (candidat) {
		return httpError(httpMsg.ACCSES_TOKEN_REVOKED, StatusCodes.UNAUTHORIZED)
	}
	return false
}


module.exports.checkRefreshBlackList = async (token) => {

	if (!token) {
		return httpError(httpMsg.ACCSES_TOKEN_EMPTY, StatusCodes.BAD_REQUEST)
	}

	const candidat = await UserToken.findOne({
		where: {
			token: token
		}
	})

	if (candidat) {
		return httpError(httpMsg.REFRESH_TOKEN_REVOKED, StatusCodes.UNAUTHORIZED)
	}
	return false
}


module.exports.addAccsesBlackList = async (token) => {

}