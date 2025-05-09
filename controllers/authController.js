const User = require('../models/User')
const bcrypt = require('bcryptjs')

class authController {
    static login(req, res) {
        res.render('auth/login')
    }
    static async loginPost(req, res) {
        const { email, pass } = req.body
        const user = await User.findOne({ where: {email} })
        if (!user) {
            req.flash('message', 'Usuário não cadastrado!')
            res.render('auth/login')
            return
        }
        const passwordMatch = bcrypt.compareSync(pass, user.pass)
        if (!passwordMatch) {
            req.flash('message', 'Senha incorreta!')
            res.render('auth/login')
            return
        }
        req.session.userid = user.id
        req.session.save(() => {
            res.redirect('/')
        })
    }
    static register(req, res) {
        res.render('auth/register')
    }
    static async registerPost(req, res) {
        const { name, email, pass, passconfirm } = req.body

        if (pass !== passconfirm) {
            req.flash('message', 'As senhas não conferem!')
            res.render('auth/register')
            return
        }

        const emailExists = await User.findOne({ where: { email } })

        if (emailExists) {
            req.flash('message', 'Email já cadastrado!')
            res.render('auth/register')
            return
        }
        // create pass
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(pass, salt)

        const user = { name, email, pass: hashedPassword }
        try {
            const createdUser = await User.create(user)
            req.session.userid = createdUser.id
            req.flash('message', 'Cadastro efetuado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }

    }
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}

module.exports = authController