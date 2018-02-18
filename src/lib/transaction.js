const uuid = require('uuid/v1')

function Transaction(startTime, startTimeMillis, endTime, endTimeMillis, responseTime, responseTimeMillis, method, protocol, host, port, path, request, response) {
  this.id = uuid()
  this.startTime = startTime
  this.startTimeMillis = startTimeMillis
  this.endTime = endTime
  this.endTimeMillis = endTimeMillis
  this.responseTime = responseTime
  this.responseTimeMillis = responseTimeMillis
  this.method = method
  this.protocol = protocol
  this.host = host
  this.port = port
  this.path = path
  this.request = request
  this.response = response
}

Transaction.prototype.getBaseURL = function() {
  return this.protocol + "://" 
    + this.host 
    + (this.port == "80" ? "" : ":" + this.port)
}

Transaction.prototype.getFullURL = function() {
  return this.getBaseURL() + this.path
}

module.exports = Transaction