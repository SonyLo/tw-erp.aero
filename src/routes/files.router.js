const express = require('express')
const router = express.Router()

const fileController = require('../controllers/file.controller')

const uploadMiddelware = require('../middleware/upload.middleware')

const moveToTrash = require('../middleware/moveToTrash.middleware')



/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Загрузка файла
 *     tags: [Files]
 *     description: Загружает файл. Требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Файл успешно загружен
 */
router.post('/upload', uploadMiddelware, fileController.upload)

/**
 * @swagger
 * /file/list:
 *   get:
 *     summary: Получение списка файлов
 *     tags: [Files]
 *     description: Возвращает список всех файлов. Требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список файлов успешно получен
 */
router.get('/list', fileController.list)



/**
 * @swagger
 * /file/download/{id}:
 *   get:
 *     summary: Скачать файл
 *     tags: [Files]
 *     description: Загружает файл по его ID. Требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID файла
 *     responses:
 *       200:
 *         description: Файл успешно скачан
 */
router.get('/download/:id', fileController.download)


/**
 * @swagger
 * /file/update/{id}:
 *   put:
 *     summary: Обновить файл
 *     tags: [Files]
 *     description: Заменяет содержимое файла. Если загрузка не удалась — остальные миддлвары не запустятся. Требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID файла
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Файл успешно обновлён
 */
router.put('/update/:id', uploadMiddelware, moveToTrash, fileController.update) // я решила предположить, что если будет ошибка в загрузке файла - следующий миделвар тупо не запустится


/**
 * @swagger
 * /file/delete/{id}:
 *   delete:
 *     summary: Удалить файл
 *     tags: [Files]
 *     description: Помещает файл в корзину. Требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID файла
 *     responses:
 *       200:
 *         description: Файл успешно удалён
 */
router.delete('/delete/:id', moveToTrash, fileController.delete)

/**
 * @swagger
 * /file/{id}:
 *   get:
 *     summary: Получить информацию о файле
 *     tags: [Files]
 *     description: Возвращает информацию по ID. Требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID файла
 *     responses:
 *       200:
 *         description: Информация о файле успешно получена
 */
router.get('/:id', fileController.fileInfo)




module.exports = router