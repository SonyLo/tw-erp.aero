
const authService = require('../services/auth.service')


module.exports.signup = async (req, res) => {

	try {
		const result = await authService.createNewUser(req.body);
		return res.status(201).json({ message: result });
	} catch (err) {
		console.error(err);
		return res.status(err.statusCode || 500).json({ error: err.message });
	}

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

