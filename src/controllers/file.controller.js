const { StatusCodes } = require('http-status-codes')
const fileService = require('../services/file.service')
const httpMsg = require('../../constants/httpMsg.constants')

const paginate = require('../../utils/pagination')

module.exports.upload = async (req, res) => {

	try {
		if (!req.fileInfo) return res.status(StatusCodes.BAD_REQUEST).json({ error: httpMsg.FILE_NOT_FOUND })
		req.fileInfo.size = req.file.size
		await fileService.upload(req.fileInfo)
		return res.status(StatusCodes.OK).json({ message: httpMsg.FILE_UPLOADED })
	}
	catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}



}


module.exports.list = async (req, res) => {
	try {
		let pagination = await paginate(req.query)
		const result = await fileService.list(pagination)
		// console.log(result)
		return res.status(StatusCodes.OK).json(result)
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
	}




}

module.exports.update = async (req, res) => {

}

module.exports.delete = async (req, res) => {

}

