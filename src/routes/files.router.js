const express = require('express')
const router = express.Router()

const fileController = require('../controllers/file.controller')



const authMiddelware = require('../middleware/auth.middleware')


router.post('/upload', fileController.upload)
router.get('/list', fileController.list) //не забудь о пагинации 
router.delete('/delete/:id', fileController.delete)
router.post('/update/:id', fileController.update)



module.exports = router