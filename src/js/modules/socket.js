const socket = {
  io: io(), // eslint-disable-line no-undef
  init: function() {
    console.log('socket init complete...')
    this.io
    this.io.on('searchCount', (data) => console.log(data))
  }
}

export {
  socket
}
