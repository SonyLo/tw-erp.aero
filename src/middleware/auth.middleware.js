
// нужно так чтобы миделвар проверял наличие токена, пррверял его валидность, если он валидный - все класно добавляем в боди инфу из пайлоад, если он не валидный - проверяем рефреш токен - если он впорядке выдаем новый аксес токен(как то) и опять таки добавляем в боди пайлоад, если рефреш токен отозван - пишем что пользователь неавторизован 

const jwt = require('../../utils/jwt');

const helper = require('../../utils/helper')

const { StatusCodes } = require('http-status-codes')
const httpMsg = require('../../constants/httpMsg.constants')
const { requiredValidator } = require('../validators/required.validator')

const authMiddelware = async (req, res, next) => {
	// const authHeader = req.headers['authorization'];
	// const accessToken = authHeader && authHeader.split(' ')[1];

	const accessToken = helper.getAccesToken(req)


	let isValid = requiredValidator(accessToken)
	if (isValid) return res.status(StatusCodes.UNAUTHORIZED).json({ error: httpMsg.ACCSES_TOKEN_EMPTY });

	try {
		console.log(jwt.verifyToken(accessToken))
		// console.log(jwt.verifyToken(accessToken))
		req.user = jwt.decodeToken(accessToken)
		// console.log(req)
		next()
	}
	catch (err) {
		//вот тут мы должны(?) проверить рефреш токен, если он актуальны - выдать новый аксес токен или это перегружает, а если да, то как это правильно сделать?
		return err.message === 'jwt expired' ? res.status(StatusCodes.FORBIDDEN).json({ error: httpMsg.ACCSES_TOKEN_EXPIRED }) : res.status(StatusCodes.FORBIDDEN).json({ error: err.message });
	}
}


module.exports = authMiddelware