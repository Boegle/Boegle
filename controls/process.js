const socketSend = require('./socketSend')

function processData(io, socket, data, parsedData) {
  console.log(data, parsedData)
  socketSend(io, socket, data)
}

module.exports = processData