module.exports.getAccesToken = (req) => {
	const authHeader = req.headers['authorization'];
	return authHeader && authHeader.split(' ')[1];


}

module.exports.getRefreshToken = (req) => {

	return req.cookies.refreshToken

}


