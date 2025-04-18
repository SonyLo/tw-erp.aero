const bcrypt = require('bcryptjs');

// const User = require('../models/user.model')
const { User, UserToken } = require('../models/index')

const { userValidator } = require('../validators/createUser.validator')
const { httpError } = require('../../utils/httpError')
const httpMsg = require('../../constants/httpMsg.constants')


const jwt = require('../../utils/jwt')


module.exports.createNewUser = async (user) => {

	const result = userValidator(user)
	if (result) httpError(result, 400)
	const candidat = await User.findOne({
		where: {
			id: user.id
		}
	})

	if (candidat) httpError(httpMsg.USER_EXISTS, 400)

	const salt = bcrypt.genSaltSync(10)
	let hash = await bcrypt.hash(user.pass, salt);


	try {
		await User.create({
			id: user.id,
			password_hash: hash
		})
	}
	catch (err) {
		throw new Error(`${httpMsg.USER_CREATE_ERROR}  ${err.message}`);
	}

	return httpMsg.USER_CREATED
}


module.exports.login = async (user, infoUserAgent) => {
	const result = userValidator(user)
	if (result) httpError(result, 400)

	const candidat = await User.findOne({
		where: {
			id: user.id
		}
	})


	if (!candidat) httpError(httpMsg.USER_NOT_FOUND, 404)

	//нужно проверить если рефреш токен есть и не просрочен - тогда вернуть что пользователь уже авторизован

	let userTokens = await candidat.getUserTokens({
		where: {
			user_agent: infoUserAgent.userAgent,
			ip: infoUserAgent.ip,
			is_revoked: false,
		}
	})

	if (userTokens.length > 0) {
		return httpError('Пользователь уже авторизован', 401)
	}

	const match = await bcrypt.compare(user.pass, candidat.password_hash);
	if (!match) {
		return httpError(httpMsg.INVALID_PASSWORD, 401)
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