const validatorConstants = require('../../constants/validator.constants')
const { requiredValidator } = require('./required.validator')

const passValidate = (pass) => {
	const required = requiredValidator(pass);
	if (required) return required;
	return pass.length >= 8 ? null : validatorConstants.PASSWORD_MIN_LENGTH;
}


module.exports = {
	passValidate
}