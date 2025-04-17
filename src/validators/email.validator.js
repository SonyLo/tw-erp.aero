const validatorConstants = require('../../constants/validator.constants')
const { requiredValidator } = require('./required.validator')

const emailValidate = (email) => {
	const required = requiredValidator(email);
	if (required) return required;
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email) ? null : validatorConstants.INVALID_PHONE;
}


module.exports = {
	emailValidate
}
