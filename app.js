const express = require('express')
const app = express()
const env = require('dotenv')
const routes = require('./controls/routes')

const socket = require('./controls/socket')
const http = require('http').Server(app)
const io = require('socket.io')(http)

env.config()

// view engine setup
app.set('view engine', 'ejs')

app.use(express.static('dist'))

app.use('/', routes)

socket(io)

http.listen(process.env.HOST || 3000, () => {
  console.log('Example app listening on port 3000!')
})
