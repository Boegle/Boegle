const api = require('./api')

function socket(io) {
  console.log(io)
  io.on('connection', (socket) => {
    console.log(socket.id + ' is connected')
    socket.on('searchValues', (data) => api.getData(data))
    
  })
}

module.exports = socket