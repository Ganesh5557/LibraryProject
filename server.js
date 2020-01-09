if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const userRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


app.set('view engine', 'ejs')// Set the default view engine to ejs from js
app.set ('views', __dirname + '/views');
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))

app.use('/', userRouter)
app.use('/authors', authorRouter)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true}) //connection with the server
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'));


app.listen(process.env.PORT || 3000)