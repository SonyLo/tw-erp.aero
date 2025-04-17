const validatorConstants = require('../../constants/validator.constants')

const { emailValidate } = require('./email.validator')
const { phoneValidate } = require('./phone.validator')
const { passValidate } = require('./pass.validator')



const userValidator = (user) => {
	const isEmailValid = !emailValidate(user.id);
	const isPhoneValid = !phoneValidate(user.id);
	const isPassValid = !passValidate(user.pass)
	// if ((emailError || phoneError) && passError) return validatorConstants.INVALID_ID;
	if (!(isEmailValid || isPhoneValid) || !isPassValid) {
		return validatorConstants.INVALID_ID;
	}
	return null;
}


module.exports = {
	userValidator
}

// module.exports.passUserValidator = (pass) => {
// 	return passValidate(pass)
// }



