const express = require('express')
const app = express()
const env = require('dotenv')
const routes = require('./controls/routes')
const port = 3000

const socketIO = require('./controls/socket')
const http = require('http').Server(app)
const io = require('socket.io')(http)

env.config()

// view engine setup
app.set('view engine', 'ejs')

app.use(express.static('dist'))

app.use('/', routes)

socketIO.init(io)

http.listen(process.env.PORT || port, () => {
  console.log('Example app listening on port 3000!')
})
