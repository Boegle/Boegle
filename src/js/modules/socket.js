const socket = {
  io: io(), // eslint-disable-line no-undef
  init: function() {
    console.log('socket init complete...')
    this.io
  }
}

export {
  socket
}
