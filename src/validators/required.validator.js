const validatorConstants = require('../../constants/validator.constants')

const requiredValidator = (field) => {
	return field === undefined || field === null || field === ''
		? validatorConstants.REQUIRED_FIELD
		: null;
}

module.exports = {
	requiredValidator
}