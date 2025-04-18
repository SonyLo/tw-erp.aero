const { StatusCodes } = require('http-status-codes')
const authService = require('../services/auth.service')


module.exports.signup = async (req, res) => {

	try {
		const result = await authService.createNewUser(req.body);
		return res.status(StatusCodes.CREATED).json({ message: result });
	} catch (err) {
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}

}


module.exports.signin = async (req, res) => {



	let ip = req.headers['x-forwarded-for'] ||
		req.socket.remoteAddress ||
		null;

	let infoUserAgent = {
		ip: ip?.replace('::ffff:', ''),
		userAgent: req.headers['user-agent'],
	}

	try {
		const result = await authService.login(req.body, infoUserAgent);
		return res.status(StatusCodes.OK).json(result);
	} catch (err) {
		console.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}

	// return ""
}

module.exports.newToken = async (req, res) => {
	// return ""


	const refreshToken = req.cookies.refreshToken;
	// console.log(refreshToken)
	const result = await authService.newAccesToken(refreshToken)

	return res.status(StatusCodes.OK).json({ token: result });
}

module.exports.info = async (req, res) => {

	const result = await authService.info(req.user)
	return res.status(StatusCodes.OK).json({ id: result });
}



module.exports.logout = async (req, res) => {
	return ""
}

