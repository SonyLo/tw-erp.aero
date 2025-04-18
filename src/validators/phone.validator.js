const validatorConstants = require('../../constants/validator.constants')
const { requiredValidator } = require('./required.validator')

const phoneValidate = (phone) => {
	const required = requiredValidator(phone);
	if (required) return required;
	const re = /^\+7\d{10}$/;
	return re.test(phone) ? null : validatorConstants.INVALID_PHONE;
}

module.exports = {
	phoneValidate
}
