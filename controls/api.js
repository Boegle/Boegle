const fetch = require('node-fetch')
const env = require('dotenv')
const parseString = require('xml2js').parseString

env.config()

const publicKey = process.env.PUBLIC_KEY
const path = 'search'
const baseUrl = 'https://zoeken.oba.nl/api/v1/' + path + '/'
const search = 'q=boek'

function getData() {
  return fetch(baseUrl + '/?authorization=' + publicKey + '&' + search)
    .then((response) => response.text())
    .then((xml) => parseString(xml, (err, data) => console.log(data.aquabrowser)))
    .catch((error) => console.log(error))
}

module.exports = {
  getData
}