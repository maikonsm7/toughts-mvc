const Tought = require('../models/Tought')

class toughtController{
    static showToughts(req, res){
        res.render('toughts/all')
    }
}

module.exports = toughtController