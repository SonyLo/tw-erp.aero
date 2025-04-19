// try {
// 	jwt.verifyToken(accessToken)
// 	return httpError(httpMsg.USER_ALREADY_AUTHORIZED, StatusCodes.BAD_REQUEST)
// }
// catch (err) {

// }



const jwt = require('../../utils/jwt');

const helper = require('../../utils/helper')

const { StatusCodes } = require('http-status-codes')
const httpMsg = require('../../constants/httpMsg.constants')

const isLoginMiddelware = async (req, res, next) => {

	const accessToken = helper.getAccesToken(req)


	if (!accessToken) {
		return next();
	}

	try {
		jwt.verifyToken(accessToken);
		//проверить блек лист
		return res.status(StatusCodes.BAD_REQUEST).json({ error: httpMsg.USER_ALREADY_AUTHORIZED })
	} catch (err) {
		return next();
	}
}


module.exports = isLoginMiddelware