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
      let summary = ''
      let ppn = ''
      let publisher = []
      let title = 'Geen titel'
      let pages = '?'
      let illustrations = 'none'
      let illustrator = ''

      if(result.titles) {
        if(result.titles[0]['short-title']) {
          title = result.titles[0]['short-title'][0]._
        } else {
          title = result.titles[0]['title'][0]._
        }
      }
  
      let titleIndex = title.indexOf(':')
      title = title.substring(0, titleIndex != -1 ? titleIndex : title.length)
  
      if(result.authors) {
        if(result.authors[0]['author']) {
          result.authors[0]['author'].forEach((author) => {
            illustrator += ' ' + author._
          })
        }
      }
  
      if(result.description) {
        if(result.description[0]['physical-description']) {
          pages = result.description[0]['physical-description'][0]._
          illustrations = result.description[0]['physical-description'][0]._
        }
      }
      
      let illustrationsIndexBefore = pages.indexOf(':')
      let illustrationsIndexAfter = pages.indexOf(';')
      illustrations = illustrations.substring(illustrationsIndexBefore + 2, illustrationsIndexAfter)

      let pagesIndex = pages.indexOf(' ')
      pages = pages.substring(0, pagesIndex != -1 ? pagesIndex : pages.length)
  
      if(result.summaries) {
        if(result.summaries[0]['summary']) {
          summary = result.summaries[0]['summary'][0]._
          summary = summary.toLowerCase()
        }
      }
  
      if(result.identifiers) {
        if(result.identifiers[0]['ppn-id']) {
          ppn = result.identifiers[0]['ppn-id'][0]._
        }
      }

      if(result.publication) {
        if(result.publication[0].publishers[0]['publisher']) {
          result.publication[0].publishers[0]['publisher'].forEach(onePublisher => {
            if(onePublisher._) {
              publisher.push(onePublisher._)
            }
          })
        }
      }
      
      return {
        title: title,
        illustrator: illustrator,
        publisher: publisher,
        illustrations: illustrations,
        pages: pages,
        ppn: ppn,
        summary: summary,
        obaId: result.id[0]._
      }
    })
    let dataArr = []
    dataObj.forEach((result) => {
      if(result.title !== '') {
        dataArr.push(result)
      }
    })
    return dataArr
  },
  detailPage: function(data) {
    let summary = ''
    let ppn = ''
    let publisher = []
    let year = 'Publicatie jaar onbekend'
    let topic = ''
    let title = 'Geen titel'
    let pages = '?'
    let author = ''

    if(data.aquabrowser.titles) {
      if(data.aquabrowser.titles[0]['short-title']) {
        title = data.aquabrowser.titles[0]['short-title'][0]._
      } else {
        title = data.aquabrowser.titles[0]['title'][0]._
      }
    }

    let titleIndex = title.indexOf(':')
    let undertitle = title.substring(titleIndex != -1 ? titleIndex + 2 : title.length, title.length)
    title = title.substring(0, titleIndex != -1 ? titleIndex : title.length)

    if(data.aquabrowser.authors) {
      if(data.aquabrowser.authors[0]['main-author']) {
        author = data.aquabrowser.authors[0]['main-author'][0]._
      } else {
        author = data.aquabrowser.authors[0]['author'][0]._
      }
    }

    if(data.aquabrowser.description) {
      if(data.aquabrowser.description[0]['physical-description']) {
        pages = data.aquabrowser.description[0]['physical-description'][0]._
      }
    }
    let pagesIndex = pages.indexOf(' ')
    pages = pages.substring(0, pagesIndex != -1 ? pagesIndex : pages.length)

    if(data.aquabrowser.summaries) {
      if(data.aquabrowser.summaries[0]['summary']) {
        summary = data.aquabrowser.summaries[0]['summary'][0]._
      }
    }

    if(data.aquabrowser.identifiers) {
      if(data.aquabrowser.identifiers[0]['ppn-id']) {
        ppn = data.aquabrowser.identifiers[0]['ppn-id'][0]._
      }
    }

    if(data.aquabrowser.subjects) {
      if(data.aquabrowser.subjects[0]['topical-subject']) {
        topic = data.aquabrowser.subjects[0]['topical-subject'][0]._
      }
    } else {
      titleIndex = title.indexOf('&')
      let titleTopic = title.substring(0, titleIndex != -1 ? titleIndex : title.length)
      topic = titleTopic
    }

    if(data.aquabrowser.publication) {
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
    }
    
    return {
      title: title,
      undertitle: undertitle,
      author: author,
      publisher: publisher,
      year: year,
      pages: pages,
      ppn: ppn,
      summary: summary,
      topic: topic,
      obaId: data.aquabrowser.id[0]._
    }
  },
  filterData: function(userData, data) {
    if(userData.illustrator !== '' || userData.publisher[0] !== '' || userData.pages !== '1' || userData.summary[0] !== '' || userData.illustrations !== '' ) {
      console.log(userData.summary)
      data.forEach((dataElement) => {
        dataElement.point = 0  

        if(userData.summary[0] !== '') {
          userData.summary.forEach((word) => {
            if(dataElement.summary.indexOf(word) > -1) {
              console.log('Add point...')
              dataElement.point++
            }   
          })
        }

        if(userData.illustrator[0] !== '') {
          userData.illustrator.forEach((word) => {
            if(dataElement.illustrator.indexOf(word) > -1) {
              console.log('Add point...')
              dataElement.point = dataElement.point + 10
            }
          })
        }

        if(userData.publisher[0] !== '') {
          userData.publisher.forEach((word) => {
            if(dataElement.publisher.indexOf(word) > -1) {
              console.log('Add point...')
              dataElement.point = dataElement.point + 10
            }
          })
        }

        if(userData.pages !== '1') {
          console.log('change...', dataElement.pages)
        }
      })
      data.sort(processData.compare)
      console.log(data)
    } 
    return data
  },
  compare: function(a, b) {
    const pointA = a.point
    const pointB = b.point

    let comparison = 0
    if(pointA > pointB) {
      comparison = 1
    } else if(pointA < pointB) {
      comparison = -1
    }
    return comparison * -1
  },
  availability: function(data) {
    if(data.aquabrowser.locations) {
      let dataObj = data.aquabrowser.locations[0].location.map((location) => {
        return {
          location: location.$.name,
          availability: location.$.available
        }
      })
      return dataObj
    } else {
      return [{
        location: '',
        availability: 'false'
      }]
    }
    
  }, 
  send: function(io, socket, data) {
    io.to(socket.id).emit('searchCount', data.resultNumber)
  } 
}

module.exports = processData