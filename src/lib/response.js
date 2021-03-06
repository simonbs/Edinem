const Header = require('./header')

function Response(body, headers, statusCode) {
  this.body = body
  this.headers = headers
  this.statusCode = statusCode
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

Response.prototype.addHeader = function() {
  this.headers.push(new Header())
}

Response.prototype.validHeaders = function() {
  return this.headers.filter(header => {
    return header.name != null && header.name != undefined
  })
}

module.exports = Response