
const jwt = require('../../utils/jwt');

const helper = require('../../utils/helper')

const { StatusCodes } = require('http-status-codes')
const httpMsg = require('../../constants/httpMsg.constants')
const { requiredValidator } = require('../validators/required.validator')



const blackListToken = require('../../utils/blackListToken')

const authMiddelware = async (req, res, next) => {

	const accessToken = helper.getAccesToken(req)


	let isValid = requiredValidator(accessToken)
	if (isValid) return res.status(StatusCodes.UNAUTHORIZED).json({ error: httpMsg.ACCSES_TOKEN_EMPTY });

	try {

		await blackListToken.checkAccsesBlackList(accessToken)
		jwt.verifyToken(accessToken)

		req.user = jwt.decodeToken(accessToken)

		next()
	}
	catch (err) {
		return err.message === 'jwt expired' ? res.status(StatusCodes.FORBIDDEN).json({ error: httpMsg.ACCSES_TOKEN_EXPIRED }) : res.status(StatusCodes.FORBIDDEN).json({ error: err.message });
	}
}


module.exports = authMiddelware