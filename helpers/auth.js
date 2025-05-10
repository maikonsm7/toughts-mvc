module.exports.checkAuth = function (req, res, next){
    const id = req.session.userid
    if(!id){
        res.redirect('/login')
    }
    next()
}