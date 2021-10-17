const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Todo = require('./models/todo')
const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

// DATABASE CONNECTION
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// METHOD OVERRIDE
app.use(methodOverride('_method'))

// ROUTES
app.get('/', (req, res) => {
  Todo.find().lean().sort({ _id: 'asc' }).then(todos => res.render('index', { todos })).catch(e => console.error(e))
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  Todo.create({ name }).then(() => res.redirect('/')).catch(e => console.log(e))
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id).lean().then(todo => res.render('detail', { todo })).catch(e => console.log(e))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id).lean().then(todo => res.render('edit', { todo })).catch(e => console.log(e))
})

app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findById(id).then(todo => {
    todo.name = name
    todo.isDone = isDone === 'on'
    todo.save()
  }).then(() => res.redirect(`/todos/${id}`)).catch(e => console.log(e))
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id).then(todo => todo.remove()).then(() => res.redirect('/')).catch(e => console.log(e))
})

// LISTENING
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})