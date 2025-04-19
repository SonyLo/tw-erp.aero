const { httpError } = require('../../utils/httpError')
const File = require('../models/file.model')






module.exports.upload = async (file) => {

	try {
		// console.log(file)
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

module.exports.update = async (id) => {
	// удаляем физически файл 
}

module.exports.delete = async (id) => {

}

