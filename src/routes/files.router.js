const express = require('express')
const router = express.Router()

const fileController = require('../controllers/file.controller')

const uploadMiddelware = require('../middleware/upload.middleware')

const moveToTrash = require('../middleware/moveToTrash.middleware')




router.post('/upload', uploadMiddelware, fileController.upload)
router.get('/list', fileController.list) //не забудь о пагинации 




router.get('/download/:id', fileController.download)
router.put('/update/:id', uploadMiddelware, moveToTrash, fileController.update) // я решила предположить, что если будет ошибка в загрузке файла - следующий миделвар тупо не запустится
router.delete('/delete/:id', fileController.delete)

router.get('/:id', fileController.fileInfo)




module.exports = router