const bcrypt = require('bcrypt');

const User = require('../models/user.model')

const { userValidator } = require('../validators/createUser.validator')
const { httpError } = require('../../utils/httpError')
const httpMsg = require('../../constants/httpMsg.constants')

module.exports.createNewUser = async (user) => {

	const result = userValidator(user)
	if (result) {
		// console.log(1)
		httpError(result, 400)
		// const error = new Error(result);
		// error.statusCode = 400;
		// throw error;
	}



	const candidat = await User.findOne({
		where: {
			id: user.id
		}
	})

	if (candidat) {
		httpError(httpMsg.USER_EXISTS, 400)
	}

	const salt = bcrypt.genSaltSync(10)
	let hash = await bcrypt.hash(user.pass, salt);
	// console.log(hash)
	try {
		await User.create({
			id: user.id,
			password_hash: hash
		})
	}
	catch (err) {
		throw new Error(`Ошибка при создании пользователя в БД: ${err.message}`);
	}

	return httpMsg.USER_CREATED
}
