const parseString = require('xml2js').parseString

const processData = {
  init: function(xml) {
    let parsedData
    parseString(xml, (err, result) => {
      parsedData = result
    })
    return parsedData    
  },
  result: function(data, parsedData) {
    data.resultNumber = Number(parsedData.aquabrowser.meta[0].count[0])
    data.pages = Math.round(data.resultNumber / 20)
    return Number(parsedData.aquabrowser.meta[0].count[0]) 
  },
  send: function(io, socket, data) {
    io.to(socket.id).emit('searchCount', data)
  } 
}

module.exports = processData