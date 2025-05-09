const Tought = require('../models/Tought')

class toughtController {
    static showToughts(req, res) {
        let order = 'DESC'
        Tought.findAll({order: [['createdAt', order]], raw: true})
        .then(data => {
            res.render('toughts/all', {toughts: data})
        })
        .catch(e => console.log(e))
    }
    static dashboard(req, res) {
        Tought.findAll({where: {UserId: req.session.userid}, raw: true})
        .then(data => {
            res.render('toughts/dashboard', {toughts: data})
        })
        .catch(e => console.log(e))
    }
    static createTought(req, res) {
        res.render('toughts/add')
    }
    static async createToughtSave(req, res) {
        const title = req.body.title
        if (!title) {
            req.flash('message', 'Digite algum pensamento!')
            res.redirect('/toughts/add')
            return
        }
        await Tought.create({ title, UserId: req.session.userid })
        req.flash('message', 'Pensamento adicionado com sucesso!')
        res.redirect('/toughts/dashboard')

    }
    static async updateTought(req, res){
        const id = req.params.id
        const tought = await Tought.findOne({where: {id}, raw: true})
        if(!tought){
            req.flash('message', 'Pensamento não encontrado!')
            res.redirect('/toughts/dashboard')
            return
        }
        res.render('toughts/edit', {tought})
    }
    static async updateToughtPost(req, res){
        const {title, id} = req.body
        await Tought.update({title}, {where: {id}})
        res.redirect('/toughts/dashboard')
    }
    static removeTought(req, res){
        const id = req.params.id
        Tought.destroy({where: {id}})
        .then(res.redirect('/toughts/dashboard'))
        .catch(e => console.log(e))
    }
}

module.exports = toughtController