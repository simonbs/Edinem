const fs = require('fs')
const xml2js = require('xml2js')
const Session = require('./session')
const Transaction = require('./transaction')
const Request = require('./request')
const Response = require('./response')
const Header = require('./header')

function XMLSessionMapper() {}

XMLSessionMapper.prototype.map = (xmlPath, callback) => {
  const parser = new xml2js.Parser({ async: true })
  fs.readFile(xmlPath, (err, data) => {
    parser.parseString(data, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, mapXMLSession(result['charles-session']))
      }
    })
  })
}

function mapXMLSession(xmlSession) {
  return new Session(xmlSession['transaction'].map(mapXMLTransaction))
}

function mapXMLTransaction(xmlTransaction) {
  return new Transaction(
    mapXMLRequest(xmlTransaction['request'][0]),
    mapXMLResponse(xmlTransaction['response'][0]))
}

function mapXMLRequest(xmlRequest) {
  return new Request(
    bodyFromXMLTransactionPart(xmlRequest),
    headersFromXMLTransactionPart(xmlRequest))
}

function mapXMLResponse(xmlResponse) {
  return new Response(
    bodyFromXMLTransactionPart(xmlResponse),
    headersFromXMLTransactionPart(xmlResponse))
}

function bodyFromXMLTransactionPart(xmlTransactionPart) {
  if ('body' in xmlTransactionPart) {
    return xmlTransactionPart['body'][0]
  } else {
    return null
  }
}

function headersFromXMLTransactionPart(xmlTransactionPart) {
  if ('headers' in xmlTransactionPart) {
    return xmlTransactionPart['headers'][0]['header'].map(mapXMLHeader)
  } else {
    return []
  }
} 

function mapXMLHeader(xmlHeader) {
  return new Header(xmlHeader['name'][0], xmlHeader['value'][0])
}

module.exports = XMLSessionMapper
