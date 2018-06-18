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
    return data
  },
  resultPage: function(data) {    
    let dataObj = data.aquabrowser.results[0].result.map((result) => {
      return {
        title: result.titles[0]['short-title'][0]._,
        author: result.authors[0]['main-author'][0]._,
        ppn: result.identifiers[0]['ppn-id'][0]._,
        obaId: result.id[0].$.nativeid,
      }
    })
    return dataObj
  },
  send: function(io, socket, data) {
    io.to(socket.id).emit('searchCount', data.resultNumber)
  } 
}

module.exports = processData