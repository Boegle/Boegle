function socketSend(io, socket, data) {
  console.log(io, data)
  io.to(socket.id).emit('searchCount', data)
}

module.exports = socketSend