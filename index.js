const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('successfully connected shoponline server')
})

app.listen(port, () => {
  console.log(`successfully connected shoponline server on port ${port}`)
})