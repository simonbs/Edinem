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

module.exports = Request