const express = require('express')
const routes = express.Router()
const authController = require('../controllers/authController')

routes.get('/login', authController.login)
routes.post('/login', authController.loginPost)
routes.get('/register', authController.register)
routes.post('/register', authController.registerPost)
routes.get('/logout', authController.logout)

module.exports = routes