const express = require('express')
const router = express.Router()
const api = require('./api')
const processData = require('./process')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/result', (req, res) => {
  console.log(api.dataObj)
  api.getResults(api.dataObj)
    .then((data) => {    
      let resultNumber = Number(data.aquabrowser.meta[0].count[0])
      let pages = Math.ceil(resultNumber / 20)
      console.log(resultNumber, pages)
      if(pages < 6) {
        return processData.resultPage(data)
      } else {
        console.log('Get results...')
      }
    })
    .then((processedData) => {
      console.log(processedData)
      res.render('result', processedData)
    })
})

router.get('/detail', (req, res) => {
  res.render('detail')
})

module.exports = router