require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// database connect
const conn = require('./db/conn')

// models
const Tought = require('./models/Tought')
const User = require('./models/User')

// engine config
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// public path
app.use(express.static('public'))

// session config
app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function (){},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}))

// flash messages
app.use(flash())

// set session to response
app.use((req, res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

// routes
const toughtRoutes = require('./routes/toughtRoutes')
const authRoutes = require('./routes/authRoutes')

// controller
const toughtController = require('./controllers/toughtController')

app.use('/toughts', toughtRoutes)
app.use('/', authRoutes)
app.get('/', toughtController.showToughts)


// conn.sync({force: true})
conn.sync()
.then(app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
}))
.catch(e => console.log(e))