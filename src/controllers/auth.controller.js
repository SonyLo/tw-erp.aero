
const authService = require('../services/auth.service')


module.exports.signup = async (req, res) => {
	const result = await authService.createNewUser(req.body)
	res.json(result)
}


module.exports.newToken = async (req, res) => {
	return ""
}
module.exports.signin = async (req, res) => {

	// return ""
}
module.exports.info = async (req, res) => {
	return ""
}
module.exports.logout = async (req, res) => {
	return ""
}

