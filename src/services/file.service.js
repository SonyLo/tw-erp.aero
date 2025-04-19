const { StatusCodes } = require('http-status-codes')
const { httpError } = require('../../utils/httpError')
const File = require('../models/file.model')
const validatorConstants = require('../../constants/validator.constants')
const httpMsg = require('../../constants/httpMsg.constants')






module.exports.upload = async (file) => {

	try {
		return await File.create(file)
	} catch (err) {
		return err
	}


}


module.exports.list = async (pagination) => {


	try {

		const { count, rows } = await File.findAndCountAll({
			limit: pagination.listSize,
			offset: pagination.offset,
			order: [['createdAt', 'DESC']],
		});

		const totalPages = Math.ceil(count / pagination.listSize);


		return {
			data: rows,
			totalItems: count,
			totalPages: totalPages,
			currentPage: pagination.page,
		}

	} catch (err) {
		return err
	}

}



module.exports.getInfoById = async (id) => {
	if (!id) return httpError(validatorConstants.REQUIRED_FIELD, StatusCodes.BAD_REQUEST)

	try {
		return File.findOne({
			where: {
				guid: id,
				is_delete: false
			}
		})
	} catch (err) {
		return err
	}


}


module.exports.downloadById = async (id) => {

	if (!id) return httpError(validatorConstants.REQUIRED_FIELD, StatusCodes.BAD_REQUEST)

	try {
		const candidat = await File.findActiveById(id)

		if (!candidat) return httpError(httpMsg.FILE_NOT_FOUND, StatusCodes.BAD_REQUEST)

		return candidat.path

	} catch (err) {
		return err
	}


}

module.exports.update = async (oldFile, newFile) => {

	try {
		return await File.update(newFile, {
			where: {
				guid: oldFile.guid
			}
		})
	} catch (err) {
		return err
	}
	// oldFile.update(newFile)

	// return {
	// 	oldFile,
	// 	newFile
	// }


}


module.exports.delete = async (id) => {

}

