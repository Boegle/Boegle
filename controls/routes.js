const express = require('express')
const router = express.Router()
const api = require('./api')
const processData = require('./process')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/result', (req, res) => {
  api.getResults(api.dataObj)
    .then((data) => {    
      let resultNumber = Number(data.aquabrowser.meta[0].count[0])
      let pages = Math.ceil(resultNumber / 20)
      console.log(resultNumber, pages, data)
      if(pages < 6) {
        return processData.resultPage(data)
      } else {
        console.log('Get results...')
      }
    })
    .then((processedData) => {
      console.log(processedData)
      res.render('result', {
        data: processedData
      })
    })
})

router.get('/book/:id', (req, res) => { 
  let detailUrl = {}
  detailUrl.url = api.getUrl() + 'id=|oba-catalogus|' + req.params.id
  console.log(detailUrl)
  api.getResults(detailUrl)
    .then((data) => processData.detailPage(data))
    .then((processedData) => {
      console.log(processedData)
      res.render('detail', {
        data: processedData
      })
    })
})

module.exports = router