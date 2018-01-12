const fs = require('fs')
const xml2js = require('xml2js')
const flattenTransactionGroups = require('./flatten_transaction_groups')

function CharlesSessionEncoder() {}

CharlesSessionEncoder.prototype.encode = function(session, filePath, callback) {
  const root = this.mapSession(session)
  const builder = new xml2js.Builder()
  const encoded = builder.buildObject(root)
  fs.writeFile(filePath, encoded, callback)
}

CharlesSessionEncoder.prototype.mapSession = function(session) {
  const encoder = this
  const transactions = flattenTransactionGroups(session.transactionGroups)
  return {
    'charles-session': {
      'transaction': transactions.map(mapTransaction)
    }
  }
}

function mapTransaction(transaction) {
  const jsonDate = new Date().toJSON()
  const millisDate = new Date().getTime()
  let metadata = {
    'method': transaction.method,
    'protocolVersion': 'HTTP/1.1',
    'protocol': transaction.protocol,
    'host': transaction.host,
    'port': transaction.port,
    'actualPort': transaction.port,
    'path': transaction.path,    
    'remoteAddress': transaction.host,
    'clientAddress': 'localhost',
    'startTime': jsonDate,
    'startTimeMillis': millisDate,
    'responseTime': jsonDate,
    'responseTimeMillis': millisDate,
    'endTime': jsonDate,
    'endTimeMillis': millisDate,
    'status': 'COMPLETE'
  }
  const queryParameters = transaction.request.queryParameters
  if (queryParameters.length > 0) {
    metadata['query'] = mapQuery(queryParameters)
  }
  return {
    '$': metadata,
    'request': mapRequest(transaction),
    'response': mapResponse(transaction.response)
  }
}

function mapQuery(queryParameters) {
  return queryParameters.map(function(queryParameter) {
    const name = queryParameter.name
    const value = queryParameter.value == null ? '' : queryParameter.value
    return name + '=' + value
  }).join('&')
}

function mapRequest(transaction) {
  const request = transaction.request
  return {
    '$': {
      'headers': 0,
      'body': (request.body || '').length
    },
    'headers': {
      'header': request.headers.map(mapHeader)
    },
    'body': [ request.body ]
  }
}

function mapResponse(response) {
  return {
    '$': {
      'status': response.statusCode,
      'headers': 0,
      'body': (response.body || '').length
    },
    'headers': {
      'header': response.headers.map(mapHeader)
    },
    'body': [ response.body ]
  }
}

function mapHeader(header) {
  return {
    'name': [ header.name ],
    'value': [ header.value ]
  }
}

module.exports = CharlesSessionEncoder