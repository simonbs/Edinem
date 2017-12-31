function Transaction(method, protocol, host, port, path, request, response) {
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