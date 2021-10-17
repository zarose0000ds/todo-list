const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  Todo.create({ name }).then(() => res.redirect('/')).catch(e => console.log(e))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id).lean().then(todo => res.render('detail', { todo })).catch(e => console.log(e))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id).lean().then(todo => res.render('edit', { todo })).catch(e => console.log(e))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  Todo.findById(id).then(todo => {
    todo.name = name
    todo.isDone = isDone === 'on'
    todo.save()
  }).then(() => res.redirect(`/todos/${id}`)).catch(e => console.log(e))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id).then(todo => todo.remove()).then(() => res.redirect('/')).catch(e => console.log(e))
})

module.exports = router