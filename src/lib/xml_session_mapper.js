const fs = require('fs')
const xml2js = require('xml2js')
const Session = require('./session')
const Transaction = require('./transaction')
const TransactionGroup = require('./transaction_group')
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
  const transactions = xmlSession['transaction'].map(mapXMLTransaction)
  const transactionGroups = groupTransactions(transactions)
  return new Session(transactionGroups)
}

function groupTransactions(transactions) {
  const groups = {}
  for (const transaction of transactions) {
    const baseURL = transaction.getBaseURL()
    if (baseURL in groups) {
      groups[baseURL].push(transaction)
    } else {
      groups[baseURL] = [ transaction ]
    }
  }
  return Object.keys(groups).map((key) => {
    return new TransactionGroup(key, groups[key])
  })
}

function mapXMLTransaction(xmlTransaction) {
  const metadata = xmlTransaction['$']
  return new Transaction(
    metadata['method'],
    metadata['protocol'],
    metadata['host'],
    metadata['actualPort'],
    metadata['path'],
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
