function Request(body, headers, queryParameters) {
  this.body = body
  this.headers = headers
  this.queryParameters = queryParameters
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