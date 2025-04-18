const express = require('express')
const router = express.Router()

const fileController = require('../controllers/file.controller')

const uploadMiddelware = require('../middleware/upload.middleware')

const authMiddelware = require('../middleware/auth.middleware')


router.post('/upload', authMiddelware, uploadMiddelware, fileController.upload)


router.get('/list', authMiddelware, fileController.list) //не забудь о пагинации 
router.delete('/delete/:id', authMiddelware, fileController.delete)
router.post('/update/:id', authMiddelware, fileController.update)



module.exports = router