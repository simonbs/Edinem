const uuid = require('uuid/v1')

function Header(name, value) {
  this.id = uuid()
  this.name = name
  this.value = value
}

module.exports = Header