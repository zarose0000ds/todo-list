const express = require('express')
const mongoose = require('mongoose')
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

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World')
})

// LISTENING
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})