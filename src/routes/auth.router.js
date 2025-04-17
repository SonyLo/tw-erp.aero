
const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')



/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Регистрация
 *     tags: [V1]
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

router.post('/signin', authController.signin)
router.post('/signin/new_token', authController.newToken)

router.post('/info', authController.info)
router.post('/logout', authController.logout)



module.exports = router




