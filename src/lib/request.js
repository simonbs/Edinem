const Header = require('./header')
const QueryParameter = require('./query_parameter')

function Request(body, headers, queryParameters) {
  this.body = body
  this.headers = headers
  this.queryParameters = queryParameters
}

Request.prototype.changeHeaderName = function(idx, newValue) {
  this.headers[idx].name = newValue
}

Request.prototype.changeHeaderValue = function(idx, newValue) {
  this.headers[idx].value = newValue
}

Request.prototype.changeQueryParameterName = function(idx, newValue) {
  this.queryParameters[idx].name = newValue
}

Request.prototype.changeQueryParameterValue = function(idx, newValue) {
  this.queryParameters[idx].value = newValue
}

Request.prototype.deleteHeader = function(idx) {
  let headers = this.headers
  headers.splice(idx, 1)
  this.headers = headers
}

Request.prototype.deleteQueryParameter = function(idx) {
  let queryParameters = this.queryParameters
  queryParameters.splice(idx, 1)
  this.headqueryParametersers = queryParameters
}

Request.prototype.addHeader = function() {
  this.headers.push(new Header())
}

Request.prototype.addQueryParameter = function() {
  this.queryParameters.push(new QueryParameter())
}

Request.prototype.validHeaders = function() {
  return this.headers.filter(header => {
    return header.name != null && header.name != undefined
  })
}

Request.prototype.validQueryParameters = function() {
  return this.queryParameters.filter(queryParameter => {
    return queryParameter.name != null && queryParameter.name != undefined
  })
}

module.exports = Request