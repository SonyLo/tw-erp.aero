const { StatusCodes } = require('http-status-codes')
const authService = require('../services/auth.service')


const helper = require('../../utils/helper')

const blackListToken = require('../../utils/blackListToken')

const handleError = require('../../utils/handleError')
const handleSuccess = require('../../utils/handleSuccess')

module.exports.signup = async (req, res) => {

	try {
		const result = await authService.createNewUser(req.body);
		return handleSuccess(res, result, StatusCodes.CREATED)
	} catch (err) {
		return handleError(res, err)
	}

}


module.exports.signin = async (req, res) => {



	const accessToken = helper.getAccesToken(req)

	let ip = req.headers['x-forwarded-for'] ||
		req.socket.remoteAddress ||
		null;

	let infoUserAgent = {
		ip: ip?.replace('::ffff:', ''), // или может это нужно отправить на слой сервиса
		userAgent: req.headers['user-agent'],
	}

	try {
		const result = await authService.signin(req.body, infoUserAgent, accessToken);
		return handleSuccess(res, result)
	} catch (err) {
		handleError(res, err)
	}


}



module.exports.info = async (req, res) => {
	// console.log("isValid")
	try {
		const result = await authService.info(req.user)
		return handleSuccess(res, result)
		// return res.status(StatusCodes.OK).json({ id: result });

	} catch (err) {
		return handleError(res, err)

	}


}

module.exports.newToken = async (req, res) => {

	try {
		const refreshToken = helper.getRefreshToken(req);
		await blackListToken.checkRefreshBlackList(refreshToken)
		const result = await authService.newAccesToken(refreshToken)

		return handleSuccess(res, result)

	}
	catch (err) {
		handleError(res, err)
	}


}

module.exports.logout = async (req, res) => {
	const refreshToken = helper.getRefreshToken(req) || null
	const accessToken = helper.getAccesToken(req) || null

	try {

		const result = await authService.logout(accessToken, refreshToken)
		return handleSuccess(res, result)

	} catch (err) {
		return handleError(res, err)
	}

}

