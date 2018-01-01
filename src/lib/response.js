function Response(body, headers) {
  this.body = body
  this.headers = headers
}

Response.prototype.changeHeaderName = function(idx, newValue) {
  this.headers[idx].name = newValue
}

Response.prototype.changeHeaderValue = function(idx, newValue) {
  this.headers[idx].value = newValue
}

Response.prototype.deleteHeader = function(idx) {
  let headers = this.headers
  headers.splice(idx, 1)
  this.headers = headers
}

module.exports = Response