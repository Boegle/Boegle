function socket(io) {
  console.log(io)
  io.on('connection', (socket) => {
    console.log(socket.id + ' is connected')
    socket.on('searchValues', (data) => console.log(data))
  })
}

module.exports = socket