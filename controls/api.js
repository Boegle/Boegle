const fetch = require('node-fetch')
const env = require('dotenv')
const parseString = require('xml2js').parseString
const processData = require('./process')

env.config()

const publicKey = process.env.PUBLIC_KEY
let path, search

function getData(io, socket, data) {
  console.log(data)
  if(data.url === 'search') {
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

    if(data.language) {
      search += '&facet=Language(' + data.language + ')'
    }

    if(data.age) {
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
  }

  const baseUrl = 'https://zoeken.oba.nl/api/v1/' + path + '/'

  console.log(search)

  return fetch(baseUrl + '/?authorization=' + publicKey + '&' + search)
    .then((response) => response.text())
    .then((xml) => parseString(xml, (err, parsedData) => processData(io, socket, data, parsedData)))
    .catch((error) => console.log(error))
}

module.exports = {
  getData
}