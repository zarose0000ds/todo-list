const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
const Todo = require('./models/todo')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// TEMPLATE ENGINE
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// BODY PARSER
app.use(express.urlencoded({ extended: true }))

// METHOD OVERRIDE
app.use(methodOverride('_method'))

// ROUTER
app.use(routes)

// LISTENING
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})