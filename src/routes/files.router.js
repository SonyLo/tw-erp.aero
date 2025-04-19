const express = require('express')
const router = express.Router()

const fileController = require('../controllers/file.controller')

const uploadMiddelware = require('../middleware/upload.middleware')


router.get('/:id', fileController.fileInfo)

router.post('/upload', uploadMiddelware, fileController.upload)
router.get('/list', fileController.list) //не забудь о пагинации 


router.get('/download/:id', fileController.download)



router.put('/update/:id', fileController.update)
router.delete('/delete/:id', fileController.delete)






module.exports = router