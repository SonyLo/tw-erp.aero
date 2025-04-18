const bcrypt = require('bcryptjs');

// const User = require('../models/user.model')
const { User, UserToken } = require('../models/index')

const { userValidator } = require('../validators/createUser.validator')
const { requiredValidator } = require('../validators/required.validator')

const { httpError } = require('../../utils/httpError')
const httpMsg = require('../../constants/httpMsg.constants')




const jwt = require('../../utils/jwt');
const { StatusCodes } = require('http-status-codes');


module.exports.createNewUser = async (user) => {

	const result = userValidator(user)
	if (result) httpError(result, StatusCodes.BAD_REQUEST)
	const candidat = await User.findOne({
		where: {
			id: user.id
		}
	})

	if (candidat) httpError(httpMsg.USER_EXISTS, StatusCodes.BAD_REQUEST)

	const salt = bcrypt.genSaltSync(10)
	let hash = await bcrypt.hash(user.pass, salt);


	try {
		await User.create({
			id: user.id,
			password_hash: hash
		})
	}
	catch (err) {
		// throw new Error(`${httpMsg.USER_CREATE_ERROR}  ${err.message}`);
		return httpError(httpMsg.USER_CREATE_ERROR, StatusCodes.BAD_REQUEST)
	}

	return httpMsg.USER_CREATED
}


module.exports.signin = async (user, infoUserAgent) => {
	const result = userValidator(user)
	if (result) httpError(result, StatusCodes.BAD_REQUEST)

	const candidat = await User.findOne({
		where: {
			id: user.id
		}
	})


	if (!candidat) httpError(httpMsg.USER_NOT_FOUND, StatusCodes.NOT_FOUND)

	//нужно проверить если рефреш токен есть и не отозван - тогда вернуть что пользователь уже авторизован
	///вопросики, тут наверное нужно и акссес токен проверить 

	let userTokens = await candidat.getUserTokens({
		where: {
			user_agent: infoUserAgent.userAgent,
			is_revoked: false,
		}
	})

	if (userTokens.length > 0) {
		return httpError('Пользователь уже авторизован', StatusCodes.BAD_REQUEST)
	}
	///вопросики

	const match = await bcrypt.compare(user.pass, candidat.password_hash);
	if (!match) {
		return httpError(httpMsg.INVALID_PASSWORD, StatusCodes.UNAUTHORIZED)
	}


	let tokenAccess = jwt.generateAccessToken(user)
	let tokenRefresh = jwt.generateRefreshToken(user)


	try {
		await candidat.createUserToken({
			token: tokenRefresh,
			user_agent: infoUserAgent.userAgent,
			ip: infoUserAgent.ip,
		});
	}
	catch (err) {
		throw new Error(`${httpMsg.REFRESH_TOKEN_CREATE_ERROR}  ${err.message}`);
	}

	return { tokenAccess, tokenRefresh }

}

module.exports.info = async (user) => {
	return user.id
}


module.exports.newAccesToken = async (refreshToken) => {
	let isValid = requiredValidator(refreshToken)
	if (isValid) return httpError(httpMsg.REFRESH_TOKEN_EMPTY, StatusCodes.UNAUTHORIZED);

	try {
		jwt.verifyToken(refreshToken)
		const candidat = await UserToken.findOne({
			where: {
				token: refreshToken,
				is_revoked: false
			}
		})
		if (!candidat) return httpError(httpMsg.REFRESH_TOKEN_REVOKED, StatusCodes.UNAUTHORIZED)

		let user = await User.findOne({
			where: {
				uuid: candidat.user_id
			}
		})
		// console.log(user)
		const payload = {
			id: user.id,
			pass: user.password_hash
		};
		return jwt.generateAccessToken(payload)

	}
	catch (err) {
		return httpError(err.message)

	}

}