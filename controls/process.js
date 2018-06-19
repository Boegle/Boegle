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
    console.log(parsedData)
    data.resultNumber = Number(parsedData.aquabrowser.meta[0].count[0])
    return data
  },
  resultPage: function(data) {    
    let dataObj = data.aquabrowser.results[0].result.map((result) => {
      let ppn = ''
      let title = result.titles[0]['short-title'][0]._
      let titleIndex = title.indexOf(':')

      title = title.substring(0, titleIndex != -1 ? titleIndex : title.length)

      if(result.identifiers[0]['ppn-id']) {
        ppn = result.identifiers[0]['ppn-id'][0]._
      }
      return {
        title: title,
        ppn: ppn,
        obaId: result.id[0].$.nativeid
      }
    })
    return dataObj
  },
  detailPage: function(data) {
    console.log(data.aquabrowser)
    let summary = ''
    let ppn = ''
    let publisher = []
    let year = 'Publicatie jaar onbekend'
    let topic = ''

    let title = data.aquabrowser.titles[0]['short-title'][0]._
    let titleIndex = title.indexOf(':')
    let undertitle = title.substring(titleIndex != -1 ? titleIndex + 2 : title.length, title.length)
    title = title.substring(0, titleIndex != -1 ? titleIndex : title.length)

    let pages = data.aquabrowser.description[0]['physical-description'][0]._
    let pagesIndex = pages.indexOf(' ')
    pages = pages.substring(0, pagesIndex != -1 ? pagesIndex : pages.length)

    if(data.aquabrowser.summaries) {
      summary = data.aquabrowser.summaries[0]['summary'][0]._
    }

    if(data.aquabrowser.identifiers[0]['ppn-id']) {
      ppn = data.aquabrowser.identifiers[0]['ppn-id'][0]._
    }

    if(data.aquabrowser.subjects) {
      topic = data.aquabrowser.subjects[0]['topical-subject'][0]._
    } else {
      topic = title
    }

    if(data.aquabrowser.publication[0].publishers[0]['publisher']) {
      data.aquabrowser.publication[0].publishers[0]['publisher'].forEach(onePublisher => {
        if(onePublisher._) {
          publisher.push(onePublisher._)
        }

        if(onePublisher.$.year) {
          year = onePublisher.$.year
        }
      })
    }
    return {
      title: title,
      undertitle: undertitle,
      author: data.aquabrowser.authors[0]['main-author'][0]._,
      publisher: publisher,
      year: year,
      pages: pages,
      ppn: ppn,
      summary: summary,
      topic: topic,
      obaId: data.aquabrowser.id[0].$.nativeid
    }
  },
  availability: function(data) {
    let dataObj = data.aquabrowser.locations[0].location.map((location) => {
      return {
        location: location.$.name,
        availability: location.$.available
      }
    })
    return dataObj
  }, 
  send: function(io, socket, data) {
    io.to(socket.id).emit('searchCount', data.resultNumber)
  } 
}

module.exports = processData