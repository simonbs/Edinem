const uuid = require('uuid/v1')

function QueryParameter(name, value) {
  this.id = uuid()
  this.name = name
  this.value = value
}

module.exports = QueryParameter