const { httpError } = require('../../utils/httpError')
const File = require('../models/file.model')






module.exports.upload = async (file) => {

	try {
		// console.log(file)
		await File.create(file)
	} catch (err) {
		return err
	}


}


module.exports.list = async (list_size = 10, page = 1) => {



}

module.exports.update = async (id) => {
	// удаляем физически файл 
}

module.exports.delete = async (id) => {

}

