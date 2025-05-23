
const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')

const authMiddelware = require('../middleware/auth.middleware')
const isLoginMiddelware = require('../middleware/isLogin.middleware')



/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Регистрация
 *     tags: [Auth]
 *     description: Регистрация нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                   type: string
 *     responses:
 *       200:
 *         description: Успешно зарегистрирован
 */
router.post('/signup', authController.signup)

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Вход
 *     tags: [Auth]
 *     description: Запрос jwt-токена по id и паролю
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                   type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 */
router.post('/signin', isLoginMiddelware, authController.signin)





/**
 * @swagger
 * /signin/new_token:
 *   post:
 *     summary: Новый токен
 *     tags: [Auth]
 *     description: Запрос jwt-токена по рефреш токену
 *     responses:
 *       200:
 *         description: Успешно зарегистрирован
 */
router.post('/signin/new_token', authController.newToken)







/**
 * @swagger
 * /info:
 *   get:
 *     summary: Инфо
 *     tags: [Auth]
 *     description: Айди юзера берется из токена. Запрос требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно выполнено
 */
router.get('/info', authMiddelware, authController.info)







/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Выход
 *     tags: [Auth]
 *     description: Выход. Запрос требует авторизации.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно выполнено
 */
router.get('/logout', authController.logout)



module.exports = router




