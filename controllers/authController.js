const User = require('../models/User')
const bcrypt = require('bcryptjs')

class authController{
    static login(req, res){
        res.render('auth/login')
    }
    static register(req, res){
        res.render('auth/register')
    }
    static async registerPost(req, res){
        const {name, email, pass, passconfirm} = req.body

        if(pass !== passconfirm){
            req.flash('message', 'As senhas não conferem!')
            res.render('auth/register')
            return
        }

        const emailExists = await User.findOne({where: {email}})

        if(emailExists){
            req.flash('message', 'Email já cadastrado!')
            res.render('auth/register')
            return
        }
        // create pass
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(pass, salt)

        const user = {name, email, pass: hashedPassword}
        try {
            await User.create(user)
            req.flash('message', 'Cadastro efetuado com sucesso!')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = authController