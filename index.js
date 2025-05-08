require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

const conn = require('./db/conn')

app.get('/', (req, res) => {
    res.send('Bem vindo!')
})

conn.sync()
.then(app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
}))
.catch(e => console.log(e))