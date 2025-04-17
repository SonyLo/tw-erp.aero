const bcrypt = require('bcrypt');

const User = require('../models/user.model')

const { userValidator } = require('../validators/createUser.validator')
const { httpError } = require('../../utils/httpError')
const httpMsg = require('../../constants/httpMsg.constants')

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


module.exports.login = async (user) => {
	const result = userValidator(user)
	if (result) httpError(result, 400)

	const candidat = await User.findOne({
		where: {
			id: user.id
		}
	})


	if (!candidat) httpError(httpMsg.USER_NOT_FOUND, 404)

	const match = await bcrypt.compare(user.pass, candidat.password_hash);
	if (!match) {
		return httpError(httpMsg.INVALID_PASSWORD, 401)
	}



	return { token: 'biba' }

}