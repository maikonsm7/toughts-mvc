const express = require('express')
const routes = express.Router()
const toughtController = require('../controllers/toughtController')

routes.get('/dashboard', toughtController.dashboard)
routes.get('/add', toughtController.createTought)
routes.post('/add', toughtController.createToughtSave)
routes.get('/remove/:id', toughtController.removeTought)
routes.get('/edit/:id', toughtController.updateTought)
routes.post('/edit', toughtController.updateToughtPost)
routes.get('/', toughtController.showToughts)

module.exports = routes