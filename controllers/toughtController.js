const Tought = require('../models/Tought')
const User = require('../models/User')
const {Op} = require('sequelize')

class toughtController {
    static async showToughts(req, res) {
        let search = req.query.search || ''
        let order = req.query.order || 'DESC'
        
        const toughtsData = await Tought.findAll({
            order: [['createdAt', order]],
            include: User,
            where:{title: {[Op.like]: `%${search}%`}}
        })
        const toughts = toughtsData.map(res => res.get({plain: true}))
        const qtdToughts = toughts.length
        res.render('toughts/all', { toughts, qtdToughts, search })
    }
    static async dashboard(req, res) {
        const id = req.session.userid
        // check if user exist and get toughts of user
        const user = await User.findOne({
            where: { id },
            include: Tought,
            plain: true
        })
        const toughts = user.Toughts.map(item => item.dataValues)
        res.render('toughts/dashboard', { toughts })
    }
    static createTought(req, res) {
        res.render('toughts/add')
    }
    static async createToughtSave(req, res) {
        const title = req.body.title
        if (!title) {
            req.flash('message', 'Digite algum pensamento!')
            req.session.save(() => {
                res.redirect('/toughts/add')
            })
            return
        }
        await Tought.create({ title, UserId: req.session.userid })
        req.flash('message', 'Pensamento adicionado com sucesso!')
        req.session.save(() => {
            res.redirect('/toughts/dashboard')
        })

    }
    static async updateTought(req, res) {
        const id = req.params.id
        const tought = await Tought.findOne({ where: { id }, raw: true })
        if (!tought) {
            req.flash('message', 'Pensamento não encontrado!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
            return
        }
        res.render('toughts/edit', { tought })
    }
    static async updateToughtPost(req, res) {
        const { title, id } = req.body
        await Tought.update({ title }, { where: { id } })
        res.redirect('/toughts/dashboard')
    }
    static removeTought(req, res) {
        const id = req.params.id
        Tought.destroy({ where: { id } })
            .then(res.redirect('/toughts/dashboard'))
            .catch(e => console.log(e))
    }
}

module.exports = toughtController