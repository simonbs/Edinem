const slug = require('./slug')

function TransactionGroup(name, transactions) {
  this.id = slug(name)
  this.name = name
  this.transactions = transactions
}

module.exports = TransactionGroup