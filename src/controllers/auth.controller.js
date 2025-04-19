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
	// console.log(accessToken)
	let ip = req.headers['x-forwarded-for'] ||
		req.socket.remoteAddress ||
		null;

	let infoUserAgent = {
		ip: ip?.replace('::ffff:', ''),
		userAgent: req.headers['user-agent'],
	}

	try {
		const result = await authService.signin(req.body, infoUserAgent, accessToken);
		return res.status(StatusCodes.OK).json(result);
	} catch (err) {
		// console.error(err);
		return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message ? err.message : err });
	}


}

module.exports.newToken = async (req, res) => {

	try {
		const refreshToken = helper.getRefreshToken(req);
		const checkRefreshBlackList = await blackListToken.checkRefreshBlackList(refreshToken)
		const result = await authService.newAccesToken(refreshToken)

		return res.status(StatusCodes.OK).json({ token: result });
	}
	catch (err) {
		return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}


}

module.exports.info = async (req, res) => {
	// console.log("isValid")
	try {
		const result = await authService.info(req.user)
		return res.status(StatusCodes.OK).json({ id: result });
	} catch (err) {
		// console.error(err);
		return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}


}



module.exports.logout = async (req, res) => {
	const refreshToken = helper.getRefreshToken(req);
	const accessToken = helper.getAccesToken(req)

	try {

		const result = await authService.logout(accessToken, refreshToken)
		return res.status(StatusCodes.OK).json(result);
	} catch (err) {

		return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}

}

