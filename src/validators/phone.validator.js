module.exports.validatePhone = async (phone) => {
	const re = /^\+7\d{10}$/;
	return re.test(phone);
}
