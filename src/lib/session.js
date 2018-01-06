const Transaction = require('./transaction')
const TransactionGroup = require('./transaction_group')
const Request = require('./request')
const Response = require('./response')
const flattenTransactionGroups = require('./flatten_transaction_groups')
const groupTransactions = require('./group_transactions')

function Session(transactionGroups) {
  this.transactionGroups = transactionGroups
}

Session.prototype.findTransaction = function(transactionId) {
  for (const transactionGroup of this.transactionGroups) {
    const idx = transactionGroup.transactions.findIndex(transaction => {
      return transaction.id == transactionId
    })    
    if (idx != -1) {      
      return transactionGroup.transactions[idx]
    }
  }
}

Session.prototype.replaceTransaction = function(transactionId, newTransaction) {
  for (const transactionGroup of this.transactionGroups) {
    const idx = transactionGroup.transactions.findIndex(transaction => {
      return transaction.id == transactionId
    })
    if (idx != -1) {      
      transactionGroup.transactions[idx] = newTransaction
      break
    }
  }
}

Session.prototype.addTransaction = function(transactionGroup) {
  let protocol = 'http'
  let host = 'example.com'
  let port = 80
  if (transactionGroup != null) {
    protocol = transactionGroup.transactions[0].protocol
    host = transactionGroup.transactions[0].host
    port = transactionGroup.transactions[0].port
  } else if (this.transactionGroups.length > 0) {
    protocol = this.transactionGroups[0].transactions[0].protocol
    host = this.transactionGroups[0].transactions[0].host
    port = this.transactionGroups[0].transactions[0].port
  }
  const transaction = new Transaction(
    'GET',
    protocol,
    host,
    port,
    '/',
    new Request(null, [], []),
    new Response(null, [], '200'))
  let transactions = flattenTransactionGroups(this.transactionGroups).concat([ transaction ])
  this.transactionGroups = groupTransactions(transactions)
  return transaction
}

Session.prototype.regroupTransactions = function() {
  let transactions = flattenTransactionGroups(this.transactionGroups)
  this.transactionGroups = groupTransactions(transactions)
}

Session.prototype.deleteTransaction = function(transactionId) {
  let transactionGroupIndexForDeletion = null
  for (const transactionGroupIdx in this.transactionGroups) {
    const transactionGroup = this.transactionGroups[transactionGroupIdx]
    const idx = transactionGroup.transactions.findIndex(transaction => {
      return transaction.id == transactionId
    })
    if (idx != -1) {
      transactionGroup.transactions.splice(idx, 1)
      // Remove transaction group if it is empty
      if (transactionGroup.transactions.length == 0) {
        transactionGroupIndexForDeletion = transactionGroupIdx
      }
      break
    }
  }
  if (transactionGroupIndexForDeletion != null) {
    this.transactionGroups.splice(transactionGroupIndexForDeletion, 1)
  }
}

module.exports = Session