const express = require('express')
const app = express()
const env = require('dotenv')
const routes = require('./controls/routes')
env.config()

// view engine setup
app.set('view engine', 'ejs')

app.use(express.static('src'))

app.use('/', routes)

app.listen(3000 || process.env.HOST, () => {
  console.log('Example app listening on port 3000!')
})
