const express = require('express')
const routes = express.Router()
const toughtController = require('../controllers/toughtController')
const checkAuth = require('../helpers/auth').checkAuth

routes.get('/dashboard', checkAuth, toughtController.dashboard)
routes.get('/add', checkAuth, toughtController.createTought)
routes.post('/add', checkAuth, toughtController.createToughtSave)
routes.get('/remove/:id', checkAuth, toughtController.removeTought)
routes.get('/edit/:id', checkAuth, toughtController.updateTought)
routes.post('/edit', checkAuth, toughtController.updateToughtPost)
routes.get('/', toughtController.showToughts)

module.exports = routes