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
      let dataArr = processData.resultPage(data)

      if(pages < 2) {
        res.render('result', {
          data: processData.filterData(api.dataObj, dataArr)
        })
      } else {

        const promise = async () => {
          for(let i = 2; i < pages + 1; i++) {
            await api.getResults(api.dataObj.url + '&page=' + i)
              .then((data) => processData.resultPage(data))
              .then((data) => {
                data.forEach((dataElement) => {
                  dataArr.push(dataElement)
                })
                console.log(dataArr)
                return dataArr
              })
          }
          return dataArr
        }

        promise()
          .then((processedData) => {
            console.log(processedData)
            return processData.filterData(api.dataObj, processedData)
          })
          .then((renderData) => {
            res.render('result', {
              data: renderData
            })
          })

      }
    })
    .catch((error) => {
      console.log(error)
      res.render('index')
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

router.get('*', (req, res) => {
  res.send('Deze pagina bestaat niet')
})

module.exports = router