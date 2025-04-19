const multer = require('multer')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

const mimiTypes = require('../../constants/forbiddenMimeTypes.constants');
const { httpError } = require('../../utils/httpError');
const httpMsg = require('../../constants/httpMsg.constants');


const storage = multer.diskStorage({

	destination(req, file, cb) {
		const uploadDir = 'public/upload'
		fs.mkdirSync(uploadDir, { recursive: true })

		cb(null, uploadDir)
	},
	filename(req, file, cb) {

		const originalName = file.originalname
		const ext = path.extname(originalName)
		const uniqueName = `${crypto.randomUUID()}${ext}`


		req.fileInfo = {
			origname: originalName,
			file_name: uniqueName,
			mime_type: file.mimetype,
			path: path.join('public/upload', uniqueName),
		}


		cb(null, uniqueName)
	}
})

const fileFilter = (req, file, cb) => {
	if (!mimiTypes.FORBIDDEN_MIME_TYPES.includes(file.mimetype)) {

		cb(null, true)
	} else {

		cb(null, false)
		// cb(null, false)
	}
}

const limits = {
	fileSize: 1024 * 1024 * 10 // 10 мб
}

module.exports = multer({ storage, fileFilter, limits }).single('file')
