const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.status(200).sendFile('public/HomePage.html', { root: __dirname })
})

app.use((req, res, next) => {
  res.status(404).send('Not found !')
})

app.listen(8888, () => {
  console.log('Example app listening on port 8888!')
})
