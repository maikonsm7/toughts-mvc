const express = require('express')
const routes = express.Router()
const toughtController = require('../controllers/toughtController')

routes.get('/', toughtController.showToughts)

module.exports = routes