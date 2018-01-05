const Transaction = require('./transaction')
const TransactionGroup = require('./transaction_group')
const Request = require('./request')
const Response = require('./response')
const flattenTransactionGroups = require('./flatten_transaction_groups')
const groupTransactions = require('./group_transactions')

function Session(transactionGroups) {
  this.transactionGroups = transactionGroups
}

Session.prototype.findTransaction = function(transactionGroupId, transactionIndex) {
  for (const transactionGroup of this.transactionGroups) {
    if (transactionGroup.id == transactionGroupId) {
      return transactionGroup.transactions[transactionIndex]
    }
  }
}

Session.prototype.replaceTransaction = function(transactionGroupId, transactionIndex, newTransaction) {
  for (const transactionGroup of this.transactionGroups) {
    if (transactionGroup.id == transactionGroupId) {
      transactionGroup.transactions[transactionIndex] = newTransaction
      break
    }
  }
}

Session.prototype.addTransaction = function() {
  let protocol = 'http'
  let host = 'example.com'
  const hasTransactionGroup =  this.transactionGroups.length > 0
  if (hasTransactionGroup) {
    protocol = this.transactionGroups[0].transactions[0].protocol
    host = this.transactionGroups[0].transactions[0].host
  }
  const transaction = new Transaction(
    'GET',
    protocol,
    host,
    80,
    '/',
    new Request(null, [], []),
    new Response(null, [], 200))
  let transactions = flattenTransactionGroups(this.transactionGroups).concat([ transaction ])
  this.transactionGroups = groupTransactions(transactions)
  return transaction.id
}

Session.prototype.deleteTransaction = function(transactionGroupId, transactionIndex) {
  for (const transactionGroup of this.transactionGroups) {
    if (transactionGroup.id == transactionGroupId) {
      transactionGroup.transactions.splice(transactionIndex, 1)
      // Remove transaction group if it is empty
      if (transactionGroup.transactions.length == 0) {
        this.transactionGroups = this.transactionGroups.filter((transactionGroup) => {
          return transactionGroup.id != transactionGroupId
        })
      }
      break
    }
  }
}

module.exports = Session