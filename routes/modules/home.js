const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find().lean().sort({ _id: 'asc' }).then(todos => res.render('index', { todos })).catch(e => console.error(e))
})

module.exports = router