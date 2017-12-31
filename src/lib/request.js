function Request(body, headers, queryParameters) {
  this.body = body
  this.headers = headers
  this.queryParameters = queryParameters
}

module.exports = Request