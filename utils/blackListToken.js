//скорее всего это лучше перенести в сервисы


const { StatusCodes } = require('http-status-codes');

const { UserToken } = require('../src/models/index')
const BlackListToken = require('../src/models/blackListToken.model')

const { httpError } = require('./httpError')

const httpMsg = require('../constants/httpMsg.constants')

const checkAccsesBlackList = async (token) => {

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


const checkRefreshBlackList = async (token) => {

	if (!token) {
		return httpError(httpMsg.REFRESH_TOKEN_EMPTY, StatusCodes.BAD_REQUEST)
	}

	const candidat = await UserToken.findOne({
		where: {
			token: token,
			is_revoked: true
		}
	})

	if (candidat) {
		return httpError(httpMsg.REFRESH_TOKEN_REVOKED, StatusCodes.UNAUTHORIZED)
	}
	return false
}


const addAccsesBlackList = async (token, options = {}) => {



	const result = await checkAccsesBlackList(token)
	if (result) return httpError(httpMsg.ACCSES_TOKEN_REVOKED, StatusCodes.BAD_REQUEST)

	try {
		const createToken = await BlackListToken.create({
			token: token
		}, options)

		return {
			success: true,
			data: createToken
		}

	} catch (error) {
		return error
	}
}


const addRefreshBlackList = async (token, options = {}) => {

	// if (result) return httpError(httpMsg.REFRESH_TOKEN_REVOKED, StatusCodes.BAD_REQUEST)

	try {
		await checkRefreshBlackList(token)
		const updateToken = await UserToken.update(
			{
				is_revoked: true
			},
			{
				where: {
					token: token
				},
				options
			})

		return {
			success: true,
			data: updateToken
		}

	} catch (error) {
		return error
	}
}

module.exports = {
	checkAccsesBlackList,
	checkRefreshBlackList,
	addAccsesBlackList,
	addRefreshBlackList
}