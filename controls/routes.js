const express = require('express')
const router = express.Router()
const api = require('./api')

api.getData()

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
