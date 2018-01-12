const fs = require('fs')
const xml2js = require('xml2js')
const Session = require('./session')
const Transaction = require('./transaction')
const TransactionGroup = require('./transaction_group')
const Request = require('./request')
const Response = require('./response')
const Header = require('./header')
const QueryParameter = require('./query_parameter')
const URLParser = require('./url_parser')
const groupTransactions = require('./group_transactions')

function XMLSessionDecoder() {}

XMLSessionDecoder.prototype.map = (xmlPath, callback) => {
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
  const transactions = xmlSession['transaction'].map(mapXMLTransaction)
  const transactionGroups = groupTransactions(transactions)
  return new Session(transactionGroups)
}

function mapXMLTransaction(xmlTransaction) {
  const metadata = xmlTransaction['$']
  return new Transaction(
    metadata['method'],
    metadata['protocol'],
    metadata['host'],
    metadata['actualPort'],
    metadata['path'],
    mapXMLRequest(xmlTransaction['request'][0], metadata.query),
    mapXMLResponse(xmlTransaction['response'][0]))
}

function mapXMLRequest(xmlRequest, queryString) {
  return new Request(
    bodyFromXMLTransactionPart(xmlRequest),
    headersFromXMLTransactionPart(xmlRequest),
    new URLParser().parseQueryString(queryString))
}

function mapXMLResponse(xmlResponse) {
  return new Response(
    bodyFromXMLTransactionPart(xmlResponse),
    headersFromXMLTransactionPart(xmlResponse),
    xmlResponse['$']['status'])
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

module.exports = XMLSessionDecoder
