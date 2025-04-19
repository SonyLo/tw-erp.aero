const { StatusCodes } = require('http-status-codes');
const fs = require('fs')

const httpMsg = require('../../constants/httpMsg.constants');

const File = require('../models/file.model');
const handleError = require('../../utils/handleError');
const validatorConstants = require('../../constants/validator.constants');
const path = require('path');

const moveToTrash = async (req, res, next) => {

	const trashDir = 'public/trash'
	const id = req.params.id || null;

	if (!id) return res.status(StatusCodes.BAD_REQUEST).json({ error: validatorConstants.REQUIRED_FIELD });

	const candidat = await File.findActiveById(id)

	if (!candidat) res.status(StatusCodes.BAD_REQUEST).json({ error: httpMsg.FILE_NOT_FOUND });
	// console.log(candidat.path)
	// тут мереместить файл в корзину и отдать дальше движ, если чет пошло не так - вернуть 500 
	try {

		fs.mkdirSync(trashDir, { recursive: true })
		const destinationPath = path.join(trashDir, candidat.file_name);
		fs.renameSync(candidat.path, destinationPath);
		req.candidatFileInfo = candidat
		next()
	} catch (err) {

		handleError(res, err)
	}


}


module.exports = moveToTrash