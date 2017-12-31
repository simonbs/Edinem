const QueryParameter = require('./query_parameter')

function URLParser() {}

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
