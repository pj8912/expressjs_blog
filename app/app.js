const express = require('express')
const app = express()
const Router = require('./router')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use('/', Router)




app.listen('3000', () => console.log('running'))