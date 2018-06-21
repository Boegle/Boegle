const fetch = require('node-fetch')
const env = require('dotenv')
const processData = require('./process')
let path, search

env.config()

const publicKey = process.env.PUBLIC_KEY

const api = {
  getData: function(io, socket, data) {
    return fetch(data.url)
      .then((response) => response.text())
      .then((xml) => processData.init(xml))
      .then((parsedData) => processData.result(data, parsedData))
      .then((processedData) => processData.send(io, socket, processedData))
      .catch((error) => console.log(error))
  },
  getResults: function(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((xml) => processData.init(xml))
  },
  dataObj: {},
  getUrl: function (io, socket, data)  {

    const baseUrl = 'https://zoeken.oba.nl/api/v1/'

    if(data) {
      path = data.url
      search = 'refine=true&facet=Type(book)'
  
      if(data.title === '') {
        search += '&q=boek'
      } else {
        search += '&q=' + data.title
      }
  
      if(data.author) {
        search += '&facet=Auteur(' + data.author + ')'
      }
  
      if(data.language  !== 'none') {
        search += '&facet=Language(' + data.language + ')'
      }
  
      if(data.age !== 'none') {
        search += '&facet=Doelgroep(' + data.age + ')'
      }
  
      if(data.pubYear) {
        search += '&facet=pubYear(' + data.pubYear + ')'
      }
  
      if(data.genres.length > 0) {
        data.genres.forEach((genre) => {
          search += '&facet=Genre(' + genre + ')'
        })
      }
    } else if(io === 'details') {
      path = io
      let detailUrl = baseUrl + path + '/?authorization=' + publicKey + '&id=' + socket
      return detailUrl
    } else if(io === 'search') {
      path = io
      let searchUrl = baseUrl + path + '/?authorization=' + publicKey + '&facet=Type(book)&q=' + socket
      return searchUrl
    } else if(io === 'availability') {
      path = io
      let searchUrl = baseUrl + path + '/?authorization=' + publicKey + '&id=' + socket
      return searchUrl
    }

    data.url = baseUrl + path + '/?authorization=' + publicKey + '&' + search 
    api.dataObj = data
    api.getData(io, socket, data)
  }
}

module.exports = api