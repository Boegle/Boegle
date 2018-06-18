const express = require('express')
const router = express.Router()
const api = require('./api')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/result', (req, res) => {
  console.log(api.dataObj)
  api.getResults(api.dataObj).then((data) => {
    console.log(data)
    res.render('result')
  })
})

router.get('/detail', (req, res) => {
  res.render('detail')
})

module.exports = router