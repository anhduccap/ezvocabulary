const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//init app
const app = express()
app.use(express.static('public'))
app.use(cookieParser())

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//set public folder
app.use(express.static(path.join(__dirname, 'public')))

//load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//db
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://anhduccap:ken1251999@ezvocabulary-yzyeo.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority')
let db = mongoose.connection

//check connection
db.once('open', () => console.log('Connected to MongoDB'))

//check db error
db.on('error', (err) => console.log(err))

//routes
const homeRouter = require('./routes/home.routes')
const authRouter = require('./routes/auth.routes')

app.use('/', homeRouter)
app.use('/', authRouter)

//start server
const port = process.env.PORT || 8080
app.listen(port, () => console.log('App listening on port ' + port))