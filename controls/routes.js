const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/result', (req, res) => {
  res.render('result')
})

router.get('/detail', (req, res) => {
  res.render('detail')
})

module.exports = router