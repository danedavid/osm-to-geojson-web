const express = require('express')
const app = express()
const port = process.env.NODE_ENV || 8081

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
