const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const app = express()
const port = 3000

// DATABASE CONNECTION
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db= mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// TEMPLATE ENGINE
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// BODY PARSER
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.get('/', (req, res) => {
  Todo.find().lean().then(todos => res.render('index', { todos })).catch(e => console.error(e))
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  Todo.create({ name }).then(() => res.redirect('/')).catch(e => console.log(e))
})

// LISTENING
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})