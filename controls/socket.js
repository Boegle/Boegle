const api = require('./api')

const socketIO = {
  init: function(io) {
    io.on('connection', (socket) => {
      console.log(socket.id + ' is connected')
      socket.on('searchValues', (data) => api.getUrl(io, socket, data))
    })
  }
}

module.exports = socketIO