const URLComponents = require('./url_components')
const QueryParameter = require('./query_parameter')

function URLParser() {}

URLParser.prototype.parseURL = function(url) {
  const parser = document.createElement('a')
  parser.href = url
  let protocol
  if (parser.protocol.slice(-1) == ':') {
    protocol = parser.protocol.substr(0, parser.protocol.length - 1)
  } else {
    proocol = parser.protocol
  }
  const port = parser.port || 80
  return new URLComponents(
    protocol,
    parser.hostname, 
    port,
    parser.pathname)
}

URLParser.prototype.parseQueryString = function(queryString) {
  if (queryString === undefined || queryString === null || queryString.length == 0) {
    return []
  }
  var query = {}
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=')
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return Object.keys(query).map(function(key) {
    return new QueryParameter(key, query[key])
  })
}

module.exports = URLParser
