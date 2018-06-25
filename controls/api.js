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

        if(data.author) {
          search += '&facet=Auteur(' + data.author + ')'
        }
    
        if(data.genres.length > 0) {
          data.genres.forEach((genre) => {
            search += '&facet=Genre(' + genre + ')'
          })
        }
        
      } else {
        search += '&q=' + data.title
      }

      if(data.language  !== 'none') {
        search += '&facet=Language(' + data.language + ')'
      }

      if(data.age !== 'none') {
        search += '&facet=Doelgroep(' + data.age + ')'
      }

      if(data.pubYear) {
        if(data.pubYear <= 2018 && data.pubYear >= 2010) {
          search += '&facet=pubYearRange(1_2010)'
        } else if(data.pubYear <= 2009 && data.pubYear >= 2000) {
          search += '&facet=pubYearRange(2_2000)'
        } else if(data.pubYear <= 1999 && data.pubYear >= 1990) {
          search += '&facet=pubYearRange(3_1990)'
        } else if(data.pubYear <= 1989 && data.pubYear >= 1980) {
          search += '&facet=pubYearRange(4_1980)'
        } else if(data.pubYear <= 1979 && data.pubYear >= 1970) {
          search += '&facet=pubYearRange(5_1970)'
        } else if(data.pubYear <= 1969) {
          search += '&facet=pubYearRange(5_OlderThan50)'
        }
        
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
    console.log(data.url)
    api.dataObj = data
    api.getData(io, socket, data)
  }
}

module.exports = api