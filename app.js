const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')
const routes = require('./routes')
const Todo = require('./models/todo')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

// TEMPLATE ENGINE
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// BODY PARSER
app.use(express.urlencoded({ extended: true }))

// METHOD OVERRIDE
app.use(methodOverride('_method'))

// SESSION
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// PASSPORT
usePassport(app)

// FLASH MESSAGE
app.use(flash())

// SAVE AUTHENTICATION INFO FOR RES
app.use((req, res ,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// ROUTER
app.use(routes)

// LISTENING
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})