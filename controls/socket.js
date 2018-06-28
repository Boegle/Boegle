const api = require('./api')

const socketIO = {
  init: function(io) {
    io.on('connection', (socket) => {
      socket.on('searchValues', (data) => api.getUrl(io, socket, data))
    })
  }
}

module.exports = socketIO