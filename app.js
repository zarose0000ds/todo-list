const express = require('express')
const app = express()
const port = 3000

// SETTING ROUTES
app.get('/', (req, res) => {
  res.send('Hello World')
})

// LISTENING FOR CONNECTION
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})