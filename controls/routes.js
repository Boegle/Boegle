const express = require('express')
const router = express.Router()
const api = require('./api')
const processData = require('./process')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/result', (req, res) => {
  api.getResults(api.dataObj.url)
    .then((data) => {    
      let resultNumber = Number(data.aquabrowser.meta[0].count[0])
      let pages = Math.ceil(resultNumber / 20)
      console.log(resultNumber)
      if(pages < 2) {
        return processData.resultPage(data)
      } else {
        let dataArr = processData.resultPage(data)
        for(let i = 2; i < pages + 1; i++) {
          console.log(api.dataObj.url)
          api.getResults(api.dataObj.url + '&page=' + i)
            .then((data) => processData.resultPage(data))
            .then((data) => {
              data.forEach((dataElement) => {
                dataArr.push(dataElement)
              })
              console.log(dataArr)
            })
        }
        console.log(dataArr)
        Promise.all(dataArr).then((data) => console.log(data))
      }
    })
    .then((processedData) => {
      res.render('result', {
        data: processedData
      })
    })
})

router.get('/book/:id', (req, res) => { 
  api.getResults(api.getUrl('details', req.params.id))
    .then((data) => processData.detailPage(data))
    .then((processedData) => {
      return {
        data: processedData
      }
    })
    .then((renderObj) => {
      return api.getResults(api.getUrl('availability', renderObj.data.obaId))
        .then((data) => processData.availability(data))
        .then((availabilityData) => {
          renderObj.availability = availabilityData
          return renderObj
        })
    })
    .then((renderObj) => {
      return api.getResults(api.getUrl('search', renderObj.data.topic))
        .then((data) => processData.resultPage(data))
        .then((alternativeData) => {
          renderObj.alternativeData = alternativeData
          return renderObj
        })
    })
    .then((renderData) => res.render('detail', renderData))
})

module.exports = router