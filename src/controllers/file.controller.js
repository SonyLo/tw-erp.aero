const { StatusCodes } = require('http-status-codes')
const fileService = require('../services/file.service')
const httpMsg = require('../../constants/httpMsg.constants')

const handleError = require('../../utils/handleError')
const handleSuccess = require('../../utils/handleSuccess')

const paginate = require('../../utils/pagination')
const validatorConstants = require('../../constants/validator.constants')

module.exports.upload = async (req, res) => {

	try {
		if (!req.fileInfo) return res.status(StatusCodes.BAD_REQUEST).json({ error: httpMsg.FILE_NOT_FOUND })
		req.fileInfo.size = req.file.size
		await fileService.upload(req.fileInfo)
		// return res.status(StatusCodes.OK).json({ message: httpMsg.FILE_UPLOADED })
		return handleSuccess(res, {
			message: httpMsg.FILE_UPLOADED
		})
	}
	catch (err) {
		return handleError(res, err)
	}



}


module.exports.list = async (req, res) => {

	try {

		let pagination = await paginate(req.query)


		const result = await fileService.list(pagination)

		return handleSuccess(res, { result })

		// return res.status(StatusCodes.OK).json(result)
	} catch (err) {

		// return handleError(res, err)
	}

}



module.exports.fileInfo = async (req, res) => {

	try {
		const id = req.params.id || null;
		const result = await fileService.getInfoById(id)

		return handleSuccess(res, {
			result
		})

		// return res.status(StatusCodes.OK).json(result)
	} catch (err) {
		return handleError(res, err)
	}

}
module.exports.download = async (req, res) => {

	try {
		const id = req.params.id || null;
		const result = await fileService.downloadById(id)
		return res.download(result);
	} catch (err) {
		return handleError(res, err)
	}

}



module.exports.update = async (req, res) => {

	try {

		const oldFile = req.candidatFileInfo
		const newFile = req.fileInfo
		newFile.size = req.file.size

		await fileService.update(oldFile, newFile)
		return handleSuccess(res, {
			message: httpMsg.FILE_UPDATED
		})

	} catch (err) {
		return handleError(res, err)
	}

}



module.exports.delete = async (req, res) => {
	try {

		const deleteFile = req.candidatFileInfo
		// console.log(oldFile)
		// const newFile = req.fileInfo
		// newFile.size = req.file.size
		// const id = req.params.id || null;
		if (!deleteFile) return handleError(res, validatorConstants.REQUIRED_FIELD)

		await fileService.delete(deleteFile)
		return handleSuccess(res, {
			message: httpMsg.FILE_DELETED
		})

	} catch (err) {
		return handleError(res, err)
	}
}

